import FullWidthColumn from '@components/FullWidthColumn';

import GeneralInfo, { GeneralInfoForm } from '@components/application-info/GeneralInfo';
import TechnicalInfo, {
	TechnicalInfoForm
} from '@components/application-info/TechnicalInfo';
import {
	Control,
	FieldErrors,
	useForm,
	UseFormGetValues,
	UseFormRegister
} from 'react-hook-form';
import Application from '@model/Application';
import { Grid, Form, Button } from '@carbon/react';
import { Checkmark } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import ApiError from '@api/ApiError';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import useReviewApplication from '@api/review/useReviewApplication';

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
				operationSupplier: applicationData?.operationSupplier
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
			isModified: isDirty
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
					<div className='flex w-full flex-1 items-center justify-end space-x-5'>
						<Button
							type='reset'
							kind='tertiary'
							disabled={!isDirty || isSuccess}
							onClick={() => {
								reset();
								apiReset();
							}}
						>
							{t('discard')}
						</Button>
						{isSuccess ? (
							<div className='flex h-8 items-center space-x-2 text-link-primary'>
								<p className='text-body-short-2'>{t('confirmed')}</p>
								<Checkmark />
							</div>
						) : (
							<Button type='submit' disabled={!isValid || isLoading}>
								{t('confirm')}
							</Button>
						)}
						<InlineLoadingStatus
							{...{ isLoading, isSuccess, isError, error: error as ApiError }}
						/>
					</div>
				</Form>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationInfoReview;
