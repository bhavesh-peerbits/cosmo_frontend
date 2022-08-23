/* eslint-disable @typescript-eslint/no-unused-vars */
import useAddAnswerToReview from '@api/user-revalidation/useAddAnswerToReview';
import useAddAppsToCampaign from '@api/user-revalidation/useAddAppsToCampaign';
import { FileUploaderDropContainer, FileUploaderItem, Form, Grid } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import FullWidthColumn from '@components/FullWidthColumn';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { InlineObject9 } from 'cosmo-api/src/v1';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type UploadFileModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	campaignId: string;
};
type FormData = {
	application: Application;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UploadFileModal = ({ isOpen, setIsOpen, campaignId }: UploadFileModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tRevalidation } = useTranslation('userRevalidation');
	// const { mutate: mutateAddApps } = useAddAppsToCampaign();
	const { mutate: mutateAddAnswer } = useAddAnswerToReview();
	const {
		control,
		reset,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange'
	});

	const addAnswer = () => {
		const file = document.getElementById('upload') as HTMLInputElement;
		const formData = new FormData();
		// formData.append('key', file?.files?.[0]);
		return mutateAddAnswer({
			reviewId: '1',
			file: formData
		});
	};

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

	const generateUploadStep = useCallback(() => {
		return (
			<CreateTearsheetStep
				title={tRevalidation('upload-file')}
				description={`${tRevalidation('upload-instructions')}.`}
				keyValue='upload'
				disableSubmit={!isValid}
			>
				<div className='space-y-7'>
					<div className='space-y-5'>
						<div>
							<p className='font-bold'>{tRevalidation('revalidation-file')}</p>
							<p className='text-label-2'>{`${tRevalidation('type-supported', {
								type: 'csv'
							})}.`}</p>
						</div>
						<div>
							<Form>
								<FileUploaderDropContainer
									labelText={tRevalidation('upload-box-description')}
									accept={['.csv']}
									className='w-full'
									id='upload'
								/>
							</Form>

							{/* //TODO fix with real upload */}
							<FileUploaderItem name='File Name' status='complete' />
						</div>
					</div>
					<SingleApplicationSelect
						level={2}
						label={`${tRevalidation('app-related')} *`}
						name='application'
						rules={{
							required: {
								value: true,
								message: tRevalidation('app-required')
							}
						}}
						control={control}
					/>
				</div>
			</CreateTearsheetStep>
		);
	}, [control, isValid, tRevalidation]);

	const generateConfirmStep = useCallback(
		() => (
			<CreateTearsheetStep title={tRevalidation('results')} keyValue='confirm'>
				<Grid className='space-y-3 divide-y-[1px] divide-solid divide-border-subtle-0'>
					<FullWidthColumn className='flex space-x-9'>
						<div className='flex-col'>
							<p className='text-text-secondary text-helper-text-1'>
								{tRevalidation('revalidators')}
							</p>
							<p className='text-heading-4'>8</p>
						</div>
						<div className='w-full flex-col'>
							<p className='text-text-secondary text-helper-text-1'>
								{tRevalidation('users-to-revalidate')}
							</p>
							<p className='text-heading-4'>8</p>
						</div>
					</FullWidthColumn>
					<FullWidthColumn>Table goes here</FullWidthColumn>
				</Grid>
			</CreateTearsheetStep>
		),
		[tRevalidation]
	);

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText='Upload File'
			cancelButtonText={t('cancel')}
			backButtonText={t('back')}
			nextButtonText={t('next')}
			title='Upload File'
			open={isOpen}
			onClose={() => {
				setIsOpen(false);
				reset();
			}}
			onRequestSubmit={() => {
				addAnswer();
			}}
		>
			{generateUploadStep()}
			{generateConfirmStep()}
		</CreateTearsheet>
	);
};
export default UploadFileModal;
