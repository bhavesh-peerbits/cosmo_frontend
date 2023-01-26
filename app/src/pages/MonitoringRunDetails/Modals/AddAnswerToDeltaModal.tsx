import ApiError from '@api/ApiError';
import useSaveAnswerWithFile from '@api/change-monitoring/useSaveAnswerWithFile';
import useSaveAnswerWithoutFile from '@api/change-monitoring/useSaveAnswerWithoutFile';
import {
	Form,
	Select,
	SelectItem,
	RadioButtonGroup,
	RadioButton,
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
	const { monitoringId = '', runId = '' } = useParams();

	const [inputOptions, setInputOptions] = useState(1);
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
				isOpen?.modal === 'ignore'
					? t('runDetails:ignore')
					: t('runDetails:add-file-path')
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
						inputOptions === 1 ? saveAnswerWithoutFile() : saveAnswerWithFile();
					}
				}
			]}
		>
			<Form className='space-y-5 px-5'>
				{isOpen?.modal === 'ignore' && (
					<TextArea labelText={t('changeMonitoring:note')} />
				)}
				{isOpen?.modal !== 'ignore' && (
					<RadioButtonGroup
						name='add-answer'
						orientation='vertical'
						legendText={t('runDetails:select-answer-type')}
						defaultSelected='1'
						className='fix-width-radio'
					>
						<RadioButton
							labelText={
								<TextInput
									id='input-text-answer'
									labelText={t('runDetails:ticket-code')}
									placeholder={t('runDetails:ticket-code-placeholder')}
									invalid={Boolean(errors.text)}
									invalidText={errors.text?.message}
									disabled={inputOptions !== 1}
									{...register('text', {
										required: {
											value: inputOptions === 1,
											message: t('modals:field-required')
										}
									})}
								/>
							}
							value='1'
							onClick={() => setInputOptions(1)}
							className='w-full'
						/>
						<RadioButton
							labelText={
								<div className='space-y-3'>
									<p>{t('runDetails:upload-new-file')}</p>
									<Layer level={1}>
										<UploaderS3Monitoring
											control={control}
											disabled={inputOptions !== 2}
										/>
									</Layer>
								</div>
							}
							value='2'
							onClick={() => setInputOptions(2)}
						/>
						<RadioButton
							labelText={
								<div className='w-full space-y-3'>
									<p className='whitespace-nowrap'>
										{t('runDetails:file-already-uploaded')}
									</p>
									<Layer level={1}>
										<Select
											id='file-selection'
											noLabel
											disabled={inputOptions !== 3}
											{...register('fileId')}
										>
											{filesAnswers?.length === 0 && (
												<SelectItem text={t('runDetails:no-files')} hidden value='' />
											)}
											{filesAnswers?.map(file => (
												<SelectItem text={file.name ?? ''} value={file.id} />
											))}
										</Select>
									</Layer>
								</div>
							}
							className='flex w-full justify-start'
							value='3'
							onClick={() => setInputOptions(3)}
							disabled={filesAnswers?.length === 0}
						/>
					</RadioButtonGroup>
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
