import ApiError from '@api/ApiError';
import useSaveAnswerWithFile from '@api/change-monitoring/useSaveAnswerWithFile';
import useSaveAnswerWithoutFile from '@api/change-monitoring/useSaveAnswerWithoutFile';
import {
	Form,
	MultiSelect,
	Toggle,
	TextArea,
	Layer,
	TextInput,
	InlineNotification,
	RadioButton,
	RadioButtonGroup
} from '@carbon/react';
import UploaderS3Monitoring from '@components/common/UploaderS3Monitoring';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import FileLink, { fromFiletoFileLink } from '@model/FileLink';
import {
	DeltaFileDto,
	FileLinkDto,
	JustificationDeltaFileDtoStatusEnum
} from 'cosmo-api/src/v1/models';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useParams } from 'react-router-dom';
import useSaveAnswerWithFileUploaded from '@api/change-monitoring/useSaveAnswerWithFileUploaded';

export interface DeltaTableRowType {
	givenBy?: string | undefined;
	givenAt?: string | undefined;
	asset?: string | undefined;
	deltaFile: DeltaFileDto;
	answerFile?: FileLinkDto[];
	answerValue?: string;
	deltaId: number;
	justificationId?: number;
	justificationStatus?: JustificationDeltaFileDtoStatusEnum;
}

type AddAnswerFormData = {
	filesId: number[];
	text: string;
	ignoreNote: string;
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
	const [isUploadSelected, setIsUploadSelected] = useState(false);
	const [radioSelected, setRadioSelected] = useState(1);
	const { monitoringId = '', runId = '' } = useParams();

	const {
		control,
		getValues: getValuesFiles,
		watch: watchFiles
	} = useForm<{ files: File[] }>({
		defaultValues: { files: [] }
	});
	const {
		register,
		getValues,
		watch,
		setValue,
		formState: { errors }
	} = useForm<AddAnswerFormData>();

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
	const {
		mutate: mutateWithFileUploaded,
		isError: isErrorWithFileUploaded,
		error: errorWithFileUploaded,
		reset: resetApiWithFileUploaded
	} = useSaveAnswerWithFileUploaded();

	const generatePathS3 = () => {
		return `${new Date().getFullYear()}/change_monitoring/monitoring/${monitoringId}/run/${runId}/${orderNumber}/${(
			Math.random() * 100000000
		).toFixed()}`;
	};

	const cleanUp = () => {
		setIsOpen({ modal: '', rows: [] });
		resetApiWithFile();
		resetApiWithoutFile();
		resetApiWithFileUploaded();
		setIsUploadSelected(false);
	};

	const uniqueDeltaIds = [...new Set(isOpen.rows.map(row => row.deltaId))];

	const saveAnswerWithoutFile = () => {
		return uniqueDeltaIds.forEach(deltaId =>
			mutateWithoutFile({
				deltaId,
				deltaFilesId: isOpen.rows.map(row => row.deltaFile.id),
				text: isOpen?.modal === 'ignore' ? getValues('ignoreNote') : getValues('text'),
				ignore: isOpen?.modal === 'ignore',
				runId
			})
		);
	};

	const saveAnswerWithFile = () => {
		return uniqueDeltaIds.forEach(deltaId => {
			mutateWithFile({
				deltaId,
				deltaFilesId: isOpen.rows.map(row => row.deltaFile.id),
				files: getValuesFiles('files'),
				runId,
				text: watch('text'),
				fileLinks: getValuesFiles('files').map(file =>
					fromFiletoFileLink(file, generatePathS3())
				)
			});
		});
	};

	const saveAnswerWithUploadedFile = () => {
		return uniqueDeltaIds.forEach(deltaId => {
			mutateWithFileUploaded({
				deltaId,
				deltaFilesId: isOpen.rows.map(row => row.deltaFile.id),
				fileLinkIds: getValues('filesId'),
				text: watch('text')
			});
		});
	};

	const saveAnswerFile = () => {
		radioSelected === 1 ? saveAnswerWithFile() : saveAnswerWithUploadedFile();
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
					disabled: isUploadSelected
						? watch('filesId')?.length === 0 || watchFiles('files')?.length === 0
						: !watch('text'),
					onClick: () => {
						isUploadSelected ? saveAnswerFile() : saveAnswerWithoutFile();
					}
				}
			]}
		>
			<Form className='space-y-5 px-5'>
				{isOpen?.modal === 'ignore' && (
					<TextArea
						labelText={`${t('changeMonitoring:note')} *`}
						placeholder={t('runDetails:ignore-placeholder')}
						invalid={Boolean(errors.ignoreNote)}
						invalidText={errors.ignoreNote?.message}
						{...register('ignoreNote', {
							required: { value: true, message: t('modals:field-required') }
						})}
					/>
				)}
				{isOpen?.modal !== 'ignore' && (
					<div className='space-y-5'>
						<TextInput
							id='input-text-answer'
							labelText={`${t('runDetails:ticket-code')} ${isUploadSelected ? '' : ' *'}`}
							placeholder={t('runDetails:ticket-code-placeholder')}
							invalid={Boolean(errors.text)}
							invalidText={errors.text?.message}
							{...register('text', {
								required: {
									value: true,
									message: t('modals:field-required')
								}
							})}
						/>
						<Toggle
							labelA='No'
							labelB={t('runDetails:yes')}
							id='add-file-toggle'
							labelText={t('runDetails:add-file')}
							toggled={isUploadSelected}
							aria-label='Toggle for add files'
							onToggle={() => setIsUploadSelected(!isUploadSelected)}
						/>
						{isUploadSelected && (
							<RadioButtonGroup
								name='select-file'
								orientation='vertical'
								legendText={t('runDetails:select-file-method')}
								defaultSelected='1'
								className='fix-width-radio'
							>
								<RadioButton
									labelText={
										<div className='space-y-3'>
											<p>{t('runDetails:upload-new-file')}</p>
											<Layer>
												<UploaderS3Monitoring
													control={control}
													disabled={radioSelected !== 1}
												/>
											</Layer>
										</div>
									}
									value='1'
									onClick={() => setRadioSelected(1)}
								/>
								<RadioButton
									labelText={
										<MultiSelect
											id='already-uploaded-select'
											titleText={t('runDetails:file-already-uploaded')}
											label={
												filesAnswers?.length !== 0
													? t('runDetails:select-files')
													: t('runDetails:no-files')
											}
											items={filesAnswers || []}
											itemToString={item => item.name || ''}
											className='w-full'
											onChange={e =>
												setValue(
													'filesId',
													e.selectedItems.map(item => +item.id)
												)
											}
											disabled={radioSelected !== 2}
										/>
									}
									value='2'
									disabled={filesAnswers?.length === 0}
									onClick={() => setRadioSelected(2)}
								/>
							</RadioButtonGroup>
						)}
					</div>
				)}
				<div
					className={cx(
						'flex items-center justify-center transition-all duration-fast-2 ease-entrance-expressive',
						{
							'opacity-0':
								!isErrorWithFile || !isErrorWithoutFile || !isErrorWithFileUploaded
						}
					)}
				>
					<InlineNotification
						kind='error'
						title='Error'
						hideCloseButton
						subtitle={
							(errorWithFile as ApiError)?.message ||
							(errorWithFileUploaded as ApiError)?.message ||
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
