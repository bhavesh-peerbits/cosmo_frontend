import useAddAnswerToReview from '@api/user-revalidation/useAddAnswerToReview';
import { Grid } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import FullWidthColumn from '@components/FullWidthColumn';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CosmoFileUploader from '@components/CosmoFileUploader';

type UploadFileModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	// campaignId: string; TODO fix campaign id
};
type FormData = {
	application: Application;
	file: File[];
};

const UploadFileModal = ({
	isOpen,
	setIsOpen /* , campaignId */
}: UploadFileModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const { mutate: mutateAddAnswer } = useAddAnswerToReview();
	const {
		control,
		reset,
		handleSubmit,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange',
		criteriaMode: 'all'
	});

	const addAnswer = useCallback(
		(data: FormData) => {
			return mutateAddAnswer({
				reviewId: '1',
				file: data.file[0]
			});
		},
		[mutateAddAnswer]
	);

	// const addApplication = () => {
	// 	mutateAddApps(
	// 		{
	// 			campaignId,
	// 			applications: [getValues().application]
	// 		},
	// 		{
	// 			onSuccess: addAnswer
	// 		}
	// 	);
	// };

	const fileSizeCheck = useCallback((file: File) => file.size < 20 * 1024 * 1024, []); // 20MB
	const fileTypeCheck = useCallback((file: File) => file.type === 'text/csv', []);

	const generateUploadStep = useCallback(() => {
		return (
			<CreateTearsheetStep
				title={t('userRevalidation:upload-file')}
				description={`${t('userRevalidation:upload-instructions')}.`}
				keyValue='upload'
				disableSubmit={!isValid}
				onNext={handleSubmit(addAnswer)}
			>
				<div className='space-y-7'>
					<div className='space-y-5'>
						<div>
							<p className='font-bold'>{t('userRevalidation:revalidation-file')}</p>
							<p className='text-label-2'>{`${t('userRevalidation:type-supported', {
								type: 'csv'
							})}.`}</p>
						</div>
						<CosmoFileUploader
							label={t('userRevalidation:upload-box-description')}
							name='file'
							rules={{
								required: true,
								validate: {
									fileSize: (file = []) =>
										file.every(fileSizeCheck) ||
										JSON.stringify(
											file.map(f => fileSizeCheck(f) || 'File size is too big')
										),
									fileType: (file = []) =>
										file.every(fileTypeCheck) ||
										JSON.stringify(
											file.map(f => fileTypeCheck(f) || 'File type is not supported')
										)
								}
							}}
							control={control}
						/>
					</div>
					<SingleApplicationSelect
						level={2}
						label={`${t('userRevalidation:app-related')} *`}
						name='application'
						rules={{
							required: {
								value: true,
								message: t('userRevalidation:app-required')
							}
						}}
						control={control}
					/>
				</div>
			</CreateTearsheetStep>
		);
	}, [addAnswer, control, fileSizeCheck, fileTypeCheck, handleSubmit, isValid, t]);

	const generateConfirmStep = useCallback(
		() => (
			<CreateTearsheetStep title={t('userRevalidation:results')} keyValue='confirm'>
				<Grid className='space-y-3 divide-y-[1px] divide-solid divide-border-subtle-0'>
					<FullWidthColumn className='flex space-x-9'>
						<div className='flex-col'>
							<p className='text-text-secondary text-helper-text-1'>
								{t('userRevalidation:revalidators')}
							</p>
							<p className='text-heading-4'>8</p>
						</div>
						<div className='w-full flex-col'>
							<p className='text-text-secondary text-helper-text-1'>
								{t('userRevalidation:users-to-revalidate')}
							</p>
							<p className='text-heading-4'>8</p>
						</div>
					</FullWidthColumn>
					<FullWidthColumn>Table goes here</FullWidthColumn>
				</Grid>
			</CreateTearsheetStep>
		),
		[t]
	);

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText='Upload File'
			cancelButtonText={t('modals:cancel')}
			backButtonText={t('modals:back')}
			nextButtonText={t('modals:next')}
			title='Upload File'
			open={isOpen}
			onClose={() => {
				setIsOpen(false);
				reset();
			}}
			onRequestSubmit={() => {
				// addAnswer();
			}}
		>
			{generateUploadStep()}
			{generateConfirmStep()}
		</CreateTearsheet>
	);
};
export default UploadFileModal;
