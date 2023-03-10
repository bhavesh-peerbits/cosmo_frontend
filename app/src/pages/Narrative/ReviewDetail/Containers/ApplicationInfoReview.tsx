import FullWidthColumn from '@components/FullWidthColumn';
import TechnicalInfo, {
	TechnicalInfoForm
} from '@pages/Narrative/Menagement/Components/TechnicalInfo';
import {
	Control,
	FieldErrors,
	useForm,
	UseFormGetValues,
	UseFormRegister,
	UseFormWatch
} from 'react-hook-form';
import Application from '@model/Narrative/Application';
import { Grid, Form, Button } from '@carbon/react';
import { Checkmark } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import ApiError from '@api/ApiError';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import useReviewApplication from '@api/review/useReviewApplication';
import GeneralInfo, {
	GeneralInfoForm
} from '@pages/Narrative/Menagement/Components/GeneralInfo';

type ApplicationForm = GeneralInfoForm & TechnicalInfoForm;

interface ApplicationInfoReviewProps {
	application: Application;
}

const ApplicationInfoReview = ({ application }: ApplicationInfoReviewProps) => {
	const { t } = useTranslation('applicationInfo');
	const { applicationData } = application;
	const {
		mutate,
		isLoading,
		isError,
		isSuccess,
		error,
		reset: apiReset
	} = useReviewApplication();

	const {
		register,
		watch,
		getValues,
		handleSubmit,
		control,
		reset,
		formState: { errors, isDirty, isValid }
	} = useForm<ApplicationForm>({
		mode: 'onChange',
		defaultValues: {
			generalInfo: {
				name: application.name,
				codeName: application.codeName,
				icon: application.icon,
				owner: application.owner,
				description: application.description,
				delegates: application.delegates,
				appMaintenance: applicationData?.appMaintenance,
				operationSupplier: applicationData?.operationSupplier,
				lastModify: application.lastModify,
				lastModifier: application.lastModifier,
				lastReview: application.lastReview,
				lastReviewer: application.lastReviewer
			},
			technicalInfo: {
				appServers: applicationData?.appServers,
				appServersOS: applicationData?.appServersOS,
				appCodePath: applicationData?.appCodePath,
				technicalCode: applicationData?.technicalCode,
				dbServers: applicationData?.dbServers,
				dbServersOS: applicationData?.dbServersOS,
				dbService: applicationData?.dbService,
				dbInstance: applicationData?.dbInstance
			}
		}
	});

	const sendData = (data: ApplicationForm) => {
		const { appMaintenance, operationSupplier, ...rest } = data.generalInfo;
		return mutate({
			appId: application.id,
			application: {
				...application,
				...rest,
				applicationData: {
					appMaintenance,
					operationSupplier,
					...data.technicalInfo
				}
			},
			modified: isDirty
		});
	};
	return (
		<Grid fullWidth className='h-full'>
			<FullWidthColumn className='pt-4'>
				<Form className='space-y-4' onSubmit={handleSubmit(sendData)}>
					<div className='space-y-7'>
						<Grid fullWidth className='space-y-7'>
							<FullWidthColumn>
								<GeneralInfo
									control={control as unknown as Control<GeneralInfoForm>}
									errors={errors as FieldErrors<GeneralInfoForm>}
									register={register as unknown as UseFormRegister<GeneralInfoForm>}
									getValues={getValues as unknown as UseFormGetValues<GeneralInfoForm>}
									watch={watch as unknown as UseFormWatch<GeneralInfoForm>}
									excludesLastReview
								/>
							</FullWidthColumn>
						</Grid>
						<Grid fullWidth className='space-y-7'>
							<FullWidthColumn>
								<TechnicalInfo
									errors={errors as FieldErrors<TechnicalInfoForm>}
									register={register as unknown as UseFormRegister<TechnicalInfoForm>}
								/>
							</FullWidthColumn>
						</Grid>
					</div>
					<FullWidthColumn className='mt-5 mr-0 flex justify-end'>
						<div className='flex flex-wrap justify-between space-x-2'>
							<div className='flex-1'>
								<InlineLoadingStatus
									{...{ isLoading, isSuccess, isError, error: error as ApiError }}
								/>
							</div>
							<div className='flex w-full flex-1 items-center justify-end'>
								<Button
									className='mr-5'
									type='reset'
									kind='secondary'
									disabled={!isDirty || isSuccess}
									onClick={() => {
										reset();
										apiReset();
									}}
									size='md'
								>
									{t('discard')}
								</Button>
								{isSuccess ? (
									<div className='flex h-8 items-center space-x-2 text-link-primary'>
										<p className='text-body-short-2'>{t('confirmed')}</p>
										<Checkmark />
									</div>
								) : (
									<Button type='submit' disabled={!isValid || isLoading} size='md'>
										{t('confirm')}
									</Button>
								)}
							</div>
						</div>
					</FullWidthColumn>
				</Form>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationInfoReview;
