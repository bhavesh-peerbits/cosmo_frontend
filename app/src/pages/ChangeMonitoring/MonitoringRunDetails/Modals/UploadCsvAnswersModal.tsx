import UploaderS3Monitoring from '@components/common/UploaderS3Monitoring';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InlineNotification, Layer } from '@carbon/react';
import { useForm } from 'react-hook-form';
import useUploadCsvAnswer from '@api/change-monitoring/useUploadCsvAnswer';
import cx from 'classnames';
import ApiError from '@api/ApiError';

type UploadCsvAnswersModalProps = {
	monitoringName: string;
	runNumber: number;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	deltaIds: number[];
};

const UploadCsvAnswersModal = ({
	monitoringName,
	runNumber,
	isOpen,
	setIsOpen,
	deltaIds
}: UploadCsvAnswersModalProps) => {
	const { t } = useTranslation(['modals', 'runDetails']);
	const { control, getValues, watch, reset } = useForm<{ files: File[] }>({
		defaultValues: { files: [] }
	});
	const { mutate, error, isError, isLoading, reset: resetApi } = useUploadCsvAnswer();

	const cleanUp = () => {
		setIsOpen(false);
		reset();
		resetApi();
	};

	const uploadAnswers = () => {
		const uniqueDeltaIds = [...new Set(deltaIds)];
		return Promise.all(
			uniqueDeltaIds.map(id =>
				mutate(
					{ deltaId: id, file: getValues('files')[0] },
					{ onSuccess: () => cleanUp() }
				)
			)
		);
	};

	const handleUploadAnswers = async () => {
		await uploadAnswers();
	};

	return (
		<TearsheetNarrow
			hasCloseIcon
			title={t('runDetails:upload-answers')}
			label={`${monitoringName} - RUN ${runNumber}`}
			description={t('runDetails:upload-answers-description')}
			open={isOpen}
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
					disabled: isLoading || !watch('files').length,
					onClick: () => {
						handleUploadAnswers();
					}
				}
			]}
		>
			<Form className='space-y-5 px-5'>
				<div className='space-y-3'>
					<p>{t('runDetails:upload-file')}</p>
					<Layer level={1}>
						<UploaderS3Monitoring
							control={control}
							disabled={false}
							multiple={false}
							accept={['.csv']}
						/>
					</Layer>
				</div>
				<div
					className={cx(
						'flex items-center justify-center transition-all duration-fast-2 ease-entrance-expressive',
						{
							'opacity-0': !isError
						}
					)}
				>
					<InlineNotification
						kind='error'
						title='Error'
						hideCloseButton
						subtitle={
							(error as ApiError)?.message ||
							'An error has occurred, please try again later'
						}
					/>
				</div>
			</Form>
		</TearsheetNarrow>
	);
};
export default UploadCsvAnswersModal;
