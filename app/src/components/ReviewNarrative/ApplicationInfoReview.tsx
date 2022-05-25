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
import { isValid } from 'date-fns';
import { Checkmark } from '@carbon/react/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type ApplicationForm = GeneralInfoForm & TechnicalInfoForm;

interface ApplicationInfoReviewProps {
	application: Application;
}

const ApplicationInfoReview = ({ application }: ApplicationInfoReviewProps) => {
	const { t } = useTranslation('applicationInfo');
	const { applicationData } = application;
	const [isConfirmed, setIsConfirmed] = useState(false);
	const {
		register,
		getValues,
		control,
		reset,
		formState: { errors, isDirty }
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

	return (
		<Grid fullWidth className='h-full'>
			<FullWidthColumn className='pt-4'>
				<Form className='space-y-4'>
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
				</Form>
			</FullWidthColumn>
			<FullWidthColumn className='mt-5 flex justify-end'>
				<div className='flex w-full flex-1 items-center justify-end space-x-5'>
					<Button
						type='reset'
						kind='tertiary'
						disabled={!isDirty || isConfirmed}
						onClick={() => reset()}
					>
						Discard Changes
					</Button>
					{isConfirmed ? (
						<div className='flex h-8 items-center space-x-2 text-link-primary'>
							<p className='text-body-short-2'>{t('confirmed')}</p>
							<Checkmark />
						</div>
					) : (
						<Button
							type='submit'
							onClick={() => setIsConfirmed(true)}
							disabled={!isValid}
						>
							{t('confirm')}
						</Button>
					)}
				</div>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationInfoReview;
