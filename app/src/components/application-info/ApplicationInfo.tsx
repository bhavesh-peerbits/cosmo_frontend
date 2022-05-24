import { Button, Form, Grid, Tile } from '@carbon/react';
import { useRef } from 'react';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import FullWidthColumn from '@components/FullWidthColumn';
import TableOfContents from '@components/TableOfContents';
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
import useEditApp from '@api/management/useEditApp';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import ApiError from '@api/ApiError';

type ApplicationForm = GeneralInfoForm & TechnicalInfoForm;

interface ApplicationInfoProps {
	application: Application;
}

const ApplicationInfo = ({ application }: ApplicationInfoProps) => {
	const { applicationData } = application;
	const { breadcrumbSize } = useBreadcrumbSize();
	const buttonRef = useRef<HTMLDivElement>(null);

	const { mutate, isLoading, isError, isSuccess, error, reset: apiReset } = useEditApp();
	const {
		register,
		getValues,
		handleSubmit,
		reset,
		control,
		formState: { errors, isDirty }
	} = useForm<ApplicationForm>({
		mode: 'onSubmit',
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
			appData: {
				...application,
				...rest,
				applicationData: {
					appMaintenance,
					operationSupplier,
					...data.technicalInfo
				}
			}
		});
	};

	return (
		<TableOfContents
			stickyOffset={buttonRef.current?.getBoundingClientRect()?.height || 0}
			tocStickyOffset={breadcrumbSize * 2}
		>
			<Grid fullWidth className='h-full'>
				<FullWidthColumn className='pt-4'>
					<Form className='space-y-4' onSubmit={handleSubmit(sendData)}>
						<div
							className='flex w-full flex-wrap items-center md:space-x-4'
							ref={buttonRef}
						>
							<Button
								disabled={isLoading}
								type='submit'
								size='md'
								className='md:max-w-auto w-full max-w-full md:w-auto'
							>
								Save Changes
							</Button>
							<Button
								kind='secondary'
								onClick={() => {
									reset();
									apiReset();
								}}
								className='md:max-w-auto w-full max-w-full md:w-auto'
								size='md'
								disabled={!isDirty}
							>
								Discard Changes
							</Button>
							<InlineLoadingStatus
								{...{ isLoading, isSuccess, isError, error: error as ApiError }}
							/>
						</div>
						<div className='space-y-7'>
							<Tile href='ApplicationName' className='w-full bg-background pb-7'>
								<Grid fullWidth className='space-y-7'>
									<FullWidthColumn
										data-toc-id='general-info'
										className='text-productive-heading-3'
									>
										General Information
									</FullWidthColumn>
									<FullWidthColumn>
										<GeneralInfo
											control={control as unknown as Control<GeneralInfoForm>}
											errors={errors as FieldErrors<GeneralInfoForm>}
											register={register as unknown as UseFormRegister<GeneralInfoForm>}
											getValues={
												getValues as unknown as UseFormGetValues<GeneralInfoForm>
											}
										/>
									</FullWidthColumn>
								</Grid>
							</Tile>
							<Tile href='ApplicationName' className='w-full bg-background pb-7'>
								<Grid fullWidth className='space-y-7'>
									<FullWidthColumn
										data-toc-id='technical-info'
										className='text-fluid-heading-3'
									>
										Technical Information
									</FullWidthColumn>
									<FullWidthColumn>
										<TechnicalInfo
											errors={errors as FieldErrors<TechnicalInfoForm>}
											register={register as unknown as UseFormRegister<TechnicalInfoForm>}
										/>
									</FullWidthColumn>
								</Grid>
							</Tile>
						</div>
					</Form>
				</FullWidthColumn>
			</Grid>
		</TableOfContents>
	);
};
export default ApplicationInfo;
