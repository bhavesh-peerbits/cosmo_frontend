import { Grid, InlineNotification } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import FullWidthColumn from '@components/FullWidthColumn';
import SingleApplicationSelect from '@components/SingleApplicationSelect';
import Application from '@model/Application';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CosmoFileUploader from '@components/CosmoFileUploader';
import useAddApplicationsAndAnswersToCampaign from '@api/user-revalidation/useAddApplicationsAndAnswersToCampaign';
import FileAnswerStatus from '@model/FileAnswerStatus';
import ApiError from '@api/ApiError';
import AnswerTable from '@components/UserRevalidation/AnswerTable';
import CampaignApplication from '@model/CampaignApplication';
import useGetCampaignApplications from '@api/user-revalidation/useGetCampaignApplications';

type UploadFileModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	campaignId: string;
	isEmpty: boolean;
	application?: Application;
};
type FormData = {
	application: Application;
	file: File[];
};

const UploadFileModal = ({
	isOpen,
	setIsOpen,
	campaignId,
	isEmpty,
	application
}: UploadFileModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const { mutateAsync: mutateAddAnswer } = useAddApplicationsAndAnswersToCampaign();
	const {
		control,
		reset,
		handleSubmit,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange',
		criteriaMode: 'all'
	});
	const [responseState, setResponseState] = useState<FileAnswerStatus>();
	const { data: applications = new Map<string, CampaignApplication>() } =
		useGetCampaignApplications(campaignId, !isEmpty);

	const addAnswer = useCallback(
		(data: FormData) => {
			return mutateAddAnswer({
				campaignId,
				file: data.file[0],
				application: data.application
			})
				.then(setResponseState)
				.catch((err: ApiError) =>
					setResponseState({
						answers: [],
						errors: [err.message]
					})
				);
		},
		[campaignId, mutateAddAnswer]
	);

	const fileSizeCheck = useCallback((file: File) => file?.size < 20 * 1024 * 1024, []); // 20MB
	const fileTypeCheck = useCallback((file: File) => file?.type === 'text/csv', []);

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
						readOnly={Boolean(application)}
						defaultValue={application}
						level={2}
						label={`${t('userRevalidation:app-related')} *`}
						name='application'
						excludedApps={[...applications.values()].map(app => app.id)}
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
	}, [
		addAnswer,
		application,
		applications,
		control,
		fileSizeCheck,
		fileTypeCheck,
		handleSubmit,
		isValid,
		t
	]);

	const generateConfirmStep = useCallback(
		() => (
			<CreateTearsheetStep
				title={t('userRevalidation:results')}
				keyValue='confirm'
				disableSubmit={(responseState?.errors || []).length > 0}
			>
				<Grid className='space-y-3 divide-y-[1px] divide-solid divide-border-subtle-0'>
					<FullWidthColumn className='flex space-x-9'>
						<div className='flex-col'>
							<p className='text-text-secondary text-helper-text-1'>
								{t('userRevalidation:revalidators')}
							</p>
							<p className='text-heading-4'>
								{
									new Set(
										responseState?.answers
											.filter(d => Boolean(d.revalidationUser))
											.map(d => d.revalidationUser?.id)
									).size
								}
							</p>
						</div>
						<div className='w-full flex-col'>
							<p className='text-text-secondary text-helper-text-1'>
								{t('userRevalidation:users-to-revalidate')}
							</p>
							<p className='text-heading-4'>
								{
									new Set(
										responseState?.answers
											.filter(d => Boolean(d.userToRevalidate))
											.map(d => d.userToRevalidate)
									).size
								}
							</p>
						</div>
					</FullWidthColumn>
					{(responseState?.errors || []).length > 0 &&
						responseState?.errors?.map(error => (
							<FullWidthColumn>
								<InlineNotification
									kind='error'
									title='Error'
									hideCloseButton
									subtitle={error}
								/>
							</FullWidthColumn>
						))}
					<FullWidthColumn>
						<AnswerTable answers={responseState?.answers || []} />
					</FullWidthColumn>
				</Grid>
			</CreateTearsheetStep>
		),
		[responseState?.answers, responseState?.errors, t]
	);

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText={t('modals:next')}
			cancelButtonText={t('modals:cancel')}
			backButtonText={t('modals:back')}
			nextButtonText='Upload File'
			title='Upload File'
			open={isOpen}
			onClose={() => {
				setIsOpen(false);
				reset();
			}}
			onRequestSubmit={() => {}}
		>
			{generateUploadStep()}
			{generateConfirmStep()}
		</CreateTearsheet>
	);
};
export default UploadFileModal;
