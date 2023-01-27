import ApiError from '@api/ApiError';
import useSaveAnswerWithFile from '@api/change-monitoring/useSaveAnswerWithFile';
import useSaveAnswerWithoutFile from '@api/change-monitoring/useSaveAnswerWithoutFile';
import {
	Form,
	Select,
	SelectItem,
	Toggle,
	TextArea,
	Layer,
	TextInput,
	InlineNotification
} from '@carbon/react';
import UploaderS3Monitoring from '@components/common/UploaderS3Monitoring';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import FileLink, { fromFiletoFileLink } from '@model/FileLink';
import { DeltaFileDto, FileLinkDto } from 'cosmo-api/src/v1/models';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useParams } from 'react-router-dom';

export interface DeltaTableRowType {
	givenBy?: string | undefined;
	givenAt?: string | undefined;
	asset?: string | undefined;
	deltaFile: DeltaFileDto;
	answerFile?: FileLinkDto;
	answerValue?: string;
	deltaId: number;
	justificationId?: number;
}

type AddAnswerFormData = {
	fileId: string;
	text: string;
};

type AddAnswerToDeltaModalProps = {
	isOpen: {
		modal: string;
		rows: DeltaTableRowType[];
	};
	setIsOpen: Dispatch<
		SetStateAction<{
			modal: string;
			rows: DeltaTableRowType[];
		}>
	>;
	monitoringName: string;
	runNumber: number;
	filesAnswers?: FileLink[];
	orderNumber: number;
};

const AddAnswerToDeltaModal = ({
	isOpen,
	setIsOpen,
	monitoringName,
	runNumber,
	filesAnswers,
	orderNumber
}: AddAnswerToDeltaModalProps) => {
	const { t } = useTranslation([
		'modals',
		'runDetails',
		'userRevalidation',
		'changeMonitoring'
	]);
	const [isUploadSelected, setIsUploadSelected] = useState(true);
	const { monitoringId = '', runId = '' } = useParams();

	const { control, getValues: getValuesFiles } = useForm<{ files: File[] }>({
		defaultValues: { files: [] }
	});
	const {
		register,
		getValues,
		formState: { errors }
	} = useForm<AddAnswerFormData>({
		defaultValues: { fileId: '', text: '' }
	});

	const {
		mutate: mutateWithoutFile,
		isError: isErrorWithoutFile,
		error: errorWithoutFile,
		reset: resetApiWithoutFile
	} = useSaveAnswerWithoutFile();
	const {
		mutate: mutateWithFile,
		isError: isErrorWithFile,
		error: errorWithFile,
		reset: resetApiWithFile
	} = useSaveAnswerWithFile();

	const generatePathS3 = () => {
		return `${new Date().getFullYear()}/change_monitoring/monitoring/${monitoringId}/run/${runId}/${orderNumber}/${(
			Math.random() * 100000000
		).toFixed()}`;
	};

	const cleanUp = () => {
		setIsOpen({ modal: '', rows: [] });
		resetApiWithFile();
		resetApiWithoutFile();
	};

	const saveAnswerWithoutFile = () => {
		const uniqueDeltaIds = [...new Set(isOpen.rows.map(row => row.deltaId))];
		return uniqueDeltaIds.forEach(deltaId =>
			mutateWithoutFile({
				deltaId,
				deltaFilesId: isOpen.rows.map(row => row.deltaFile.id),
				text: getValues('text'),
				runId
			})
		);
	};

	const saveAnswerWithFile = () => {
		const uniqueDeltaIds = [...new Set(isOpen.rows.map(row => row.deltaId))];
		return uniqueDeltaIds.forEach(deltaId => {
			mutateWithFile({
				deltaId,
				deltaFilesId: isOpen.rows.map(row => row.deltaFile.id),
				files: getValuesFiles('files'),
				runId,
				fileLinks: getValuesFiles('files').map(file =>
					fromFiletoFileLink(file, generatePathS3())
				)
			});
		});
	};

	return (
		<TearsheetNarrow
			hasCloseIcon
			title={
				isOpen?.modal === 'ignore' ? t('runDetails:ignore') : t('runDetails:confirm')
			}
			label={`${monitoringName} - RUN ${runNumber}`}
			description={
				isOpen?.modal === 'ignore'
					? t('runDetails:ignore-description')
					: t('runDetails:add-answer-description')
			}
			open={isOpen?.modal === 'add-answer' || isOpen?.modal === 'ignore'}
			onClose={cleanUp}
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-add-answer'
				},
				{
					label: t('modals:save'),
					id: 'save-answer',
					type: 'submit',
					// disabled: !isValid,
					onClick: () => {
						getValues('fileId') || getValuesFiles('files')
							? saveAnswerWithFile()
							: saveAnswerWithoutFile();
					}
				}
			]}
		>
			<Form className='space-y-5 px-5'>
				{isOpen?.modal === 'ignore' && (
					<TextArea labelText={t('changeMonitoring:note')} />
				)}
				{isOpen?.modal !== 'ignore' && (
					<div className='space-y-5'>
						<TextInput
							id='input-text-answer'
							labelText={t('runDetails:ticket-code')}
							placeholder={t('runDetails:ticket-code-placeholder')}
							invalid={Boolean(errors.text)}
							invalidText={errors.text?.message}
							{...register('text', {
								required: {
									value: !getValuesFiles('files') || !getValues('fileId'),
									message: t('modals:field-required')
								}
							})}
						/>
						<Toggle
							labelA={t('runDetails:upload-file')}
							labelB={t('runDetails:select-from-uploaded')}
							id='add-answer-toggle'
							toggled={!isUploadSelected}
							aria-label='Toggle for add answer'
							onToggle={() => setIsUploadSelected(!isUploadSelected)}
						/>
						{isUploadSelected && (
							<div className='space-y-3'>
								<p>{t('runDetails:upload-new-file')}</p>
								<Layer level={1}>
									<UploaderS3Monitoring control={control} disabled={false} />
								</Layer>
							</div>
						)}
						{!isUploadSelected && (
							<div className='w-full space-y-3'>
								<p className='whitespace-nowrap'>
									{t('runDetails:file-already-uploaded')}
								</p>
								<Layer level={1}>
									<Select id='file-selection' noLabel {...register('fileId')}>
										<SelectItem
											text={
												filesAnswers?.length === 0
													? t('runDetails:no-files')
													: t('runDetails:select-file')
											}
											hidden
											value=''
										/>

										{filesAnswers?.map(file => (
											<SelectItem text={file.name ?? ''} value={file.id} />
										))}
									</Select>
								</Layer>
							</div>
						)}
					</div>
				)}
				<div
					className={cx(
						'flex items-center justify-center transition-all duration-fast-2 ease-entrance-expressive',
						{
							'opacity-0': !isErrorWithFile || !isErrorWithoutFile
						}
					)}
				>
					<InlineNotification
						kind='error'
						title='Error'
						hideCloseButton
						subtitle={
							(errorWithFile as ApiError)?.message ||
							(errorWithoutFile as ApiError)?.message ||
							'An error has occurred, please try again later'
						}
					/>
				</div>
			</Form>
		</TearsheetNarrow>
	);
};
export default AddAnswerToDeltaModal;
