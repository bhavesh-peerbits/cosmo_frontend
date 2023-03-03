import { InlineNotification } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import ApiError from '@api/ApiError';
import { useTranslation } from 'react-i18next';
// import useCreateApp from '@api/management/useCreateApp';
import useCreateTemplate from '@api/document-templates/useCreateTemplate';
import GeneralInfo, { GeneralInfoForm } from '../Components/GeneralInfo';
import ApproverInfo, { ApproverInfoForm } from '../Components/ApproverInfo';
import ChaptersInfo, { ChapterInfoForm } from '../Components/ChaptersInfo';
// import DocumentTemplatesRecapInfo from '../Components/DocumentTemplatesRecapInfo';
type NewTemplateProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const NewTemplateModal = ({ isOpen, setIsOpen }: NewTemplateProps) => {
	const { t } = useTranslation('documentationAdmin');

	const { mutateAsync, error: createError, reset: resetApi } = useCreateTemplate();

	const {
		register,
		getValues,
		watch,
		reset: resetGeneralInfo,
		setValue,
		formState: { errors, isValid, isDirty }
	} = useForm<GeneralInfoForm>({
		mode: 'onChange',
		defaultValues: {
			generalInfo: {
				name: undefined,
				type: undefined,
				noticeOfExpiration: 336,
				allowChanges: false,
				freeTextEnabled: false,
				freeTextRequired: false,
				applicationEnabled: false,
				applicationRequired: false
			}
		}
	});

	const {
		register: approverRegister,
		reset: resetApproverInfo,
		watch: watchApproverInfo,
		control,
		formState: { errors: approverError, isDirty: approverIsDirty }
	} = useForm<ApproverInfoForm>({
		mode: 'onChange',
		defaultValues: {
			steps: []
		}
	});

	const {
		register: chapterRegister,
		handleSubmit: chapterHandleSubmit,
		reset: resetChapterInfo,
		formState: { errors: chapterError, isDirty: chapterIsDirty }
	} = useForm<ChapterInfoForm>({
		mode: 'onChange',
		defaultValues: {
			chapters: []
		}
	});

	const clearData = () => {
		resetApi();
		resetGeneralInfo();
		resetApproverInfo();
		resetChapterInfo();
	};

	const generateGeneralInfo = useCallback(() => {
		return (
			<CreateTearsheetStep
				title={t('general-information')}
				disableSubmit={!isValid}
				hasFieldset={false}
				description={t('general-description')}
				keyValue='general-Info'
			>
				{Object.keys(errors).length > 0 && isDirty && (
					<InlineNotification
						kind='error'
						title='Error'
						hideCloseButton
						subtitle='Resolve errors to continue'
					/>
				)}
				{Boolean(createError) && (
					<InlineNotification
						kind='error'
						title='Error'
						hideCloseButton
						subtitle={
							(createError as ApiError)?.message ||
							'An error has occurred, please try again later'
						}
					/>
				)}
				<GeneralInfo
					errors={errors}
					register={register}
					watch={watch}
					setValue={setValue}
				/>
			</CreateTearsheetStep>
		);
	}, [errors, isValid, register, t, isDirty, watch, setValue, createError]);

	const generateApproverInfo = useCallback(
		() => (
			<CreateTearsheetStep
				title={t('approver')}
				description={t('approver-description')}
				keyValue='approver-info'
			>
				<div className='mb-5'>
					<div>
						{Object.keys(approverError).length > 0 && approverIsDirty && (
							<InlineNotification
								kind='error'
								title='Error'
								hideCloseButton
								subtitle='Resolve errors to continue'
							/>
						)}
					</div>
					<div>
						{Boolean(createError) && (
							<InlineNotification
								kind='error'
								title='Error'
								hideCloseButton
								subtitle={
									(createError as ApiError)?.message ||
									'An error has occurred, please try again later'
								}
							/>
						)}
					</div>
				</div>
				<ApproverInfo
					watch={watchApproverInfo}
					errors={approverError}
					register={approverRegister}
					control={control}
				/>
			</CreateTearsheetStep>
		),
		[
			watchApproverInfo,
			control,
			approverError,
			approverIsDirty,
			approverRegister,
			t,
			createError
		]
	);

	const generateChaptersInfo = useCallback(
		() => (
			<CreateTearsheetStep
				keyValue='chapter-info'
				title={t('chapter-title')}
				description={t('chapters-description')}
			>
				<div className='mb-5'>
					<div>
						{Object.keys(chapterError).length > 0 && chapterIsDirty && (
							<InlineNotification
								kind='error'
								title='Error'
								hideCloseButton
								subtitle='Resolve errors to continue'
							/>
						)}
					</div>
					<div>
						{Boolean(createError) && (
							<InlineNotification
								kind='error'
								title='Error'
								hideCloseButton
								subtitle={
									(createError as ApiError)?.message ||
									'An error has occurred, please try again later'
								}
							/>
						)}
					</div>
				</div>
				<ChaptersInfo register={chapterRegister} />
			</CreateTearsheetStep>
		),
		[chapterError, chapterIsDirty, chapterRegister, t, createError]
	);

	// const generateRecapInfo = useCallback(
	// 	() => (
	// 		<CreateTearsheetStep
	// 			keyValue='recap-info'
	// 			title={t('recap-info')}
	// 			description={t('recap-description')}
	// 		>
	// 			<DocumentTemplatesRecapInfo RecapInfo={} />
	// 		</CreateTearsheetStep>
	// 	),
	// 	[t]
	// );

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText='create'
			cancelButtonText='cancel'
			backButtonText='back'
			nextButtonText='next'
			description={t('create-template')}
			title={t('new-document-template')}
			open={isOpen}
			onClose={() => {
				clearData();
				setIsOpen(false);
			}}
			onRequestSubmit={chapterHandleSubmit(templateInfo => {
				const genericData = getValues();

				// Here we are getting unwanted function includesMulti inside the data.chapters
				// and may because of it we are getting this error "Malformed JSON Request"

				// Another question is why here we are getting the chapter info in another object rather than inside the generalInfo object like steps object we are getting.

				return mutateAsync({
					templateData: {
						id: 0,
						name: genericData.generalInfo.name,
						type: genericData.generalInfo.type,
						noticeOfExpiration: genericData.generalInfo.noticeOfExpiration,
						allowChanges: genericData.generalInfo.allowChanges,
						freeTextEnabled: genericData.generalInfo.freeTextEnabled,
						freeTextRequired: genericData.generalInfo.freeTextRequired,
						applicationEnabled: genericData.generalInfo.applicationEnabled,
						applicationRequired: genericData.generalInfo.applicationRequired,
						steps: genericData.steps,
						chapters: templateInfo.chapters
					}
				});
			})}
		>
			{generateGeneralInfo()}
			{generateApproverInfo()}
			{generateChaptersInfo()}
			{/* {generateRecapInfo()} */}
		</CreateTearsheet>
	);
};
export default NewTemplateModal;
