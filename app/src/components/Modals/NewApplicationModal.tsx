import { Checkbox, InlineNotification, Stack } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import { useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import GeneralInfo, { GeneralInfoForm } from '@components/application-info/GeneralInfo';
import TechnicalInfo, {
	TechnicalInfoForm
} from '@components/application-info/TechnicalInfo';
import useCreateApp from '@api/management/useCreateApp';
import ApiError from '@api/ApiError';

type NewApplicationProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const emptyFunc = (f: (data: undefined) => void) => () => f(undefined);

const NewApplicationModal = ({ isOpen, setIsOpen }: NewApplicationProps) => {
	const [shouldIncludeTechnicalInfo, setShouldIncludeTechnicalInfo] = useState(true);
	const { mutateAsync, error: createError, reset: resetApi } = useCreateApp();
	const {
		register,
		control,
		getValues,
		reset,
		formState: { errors, isValid, isDirty }
	} = useForm<GeneralInfoForm>({
		mode: 'onChange',
		defaultValues: {
			generalInfo: {
				name: undefined,
				codeName: undefined,
				icon: 'web',
				owner: undefined,
				description: undefined,
				delegates: [],
				appMaintenance: undefined,
				operationSupplier: undefined
			}
		}
	});

	const {
		register: technicalRegister,
		handleSubmit: technicalHandleSubmit,
		reset: resetTechnicalInfo,
		formState: { errors: technicalError, isDirty: technicalIsDirty }
	} = useForm<TechnicalInfoForm>({
		mode: 'onChange'
	});

	const clearData = () => {
		setShouldIncludeTechnicalInfo(true);
		resetApi();
		reset();
		resetTechnicalInfo();
	};

	const generateGeneralInfo = useCallback(() => {
		return (
			<CreateTearsheetStep
				title='General Information'
				disableSubmit={!isValid}
				hasFieldset={false}
				subtitle='That are the basic information about the application'
				description='You can also provide additional information about the application checking the technical information flag'
				keyValue='topic'
			>
				<Stack gap={5}>
					<Checkbox
						labelText='Include technical information'
						id='include-technical-info'
						onChange={(e, { checked }) => setShouldIncludeTechnicalInfo(checked)}
						checked={shouldIncludeTechnicalInfo}
					/>
					{Object.keys(errors).length > 0 && isDirty && (
						<InlineNotification
							kind='error'
							title='Error'
							hideCloseButton
							subtitle='Resolve errors to continue'
						/>
					)}
					{!shouldIncludeTechnicalInfo && Boolean(createError) && (
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
				</Stack>
				<GeneralInfo control={control} errors={errors} register={register} />
			</CreateTearsheetStep>
		);
	}, [
		control,
		createError,
		errors,
		isDirty,
		isValid,
		register,
		shouldIncludeTechnicalInfo
	]);

	const generateTechnicalInfo = useCallback(
		() => (
			<CreateTearsheetStep
				keyValue='technical-info'
				title='Technical Information'
				subtitle='That are the technical information about the application'
				description='You can also provide additional information about the application checking the technical information flag'
				disableSubmit={!technicalIsDirty}
				fieldsetLegendText='Technical Info'
				includeStep={shouldIncludeTechnicalInfo}
			>
				<div className='mb-5'>
					<div>
						{Object.keys(technicalError).length > 0 && technicalIsDirty && (
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
				<TechnicalInfo errors={technicalError} register={technicalRegister} />
			</CreateTearsheetStep>
		),
		[
			createError,
			shouldIncludeTechnicalInfo,
			technicalError,
			technicalIsDirty,
			technicalRegister
		]
	);

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText='Create Application'
			cancelButtonText='Cancel'
			backButtonText='Back'
			nextButtonText='Next'
			description='Create a new application'
			title='New Application'
			open={isOpen}
			onClose={() => {
				clearData();
				setIsOpen(false);
			}}
			onRequestSubmit={(shouldIncludeTechnicalInfo ? technicalHandleSubmit : emptyFunc)(
				data => {
					const genericData = getValues();
					const { appMaintenance, operationSupplier, ...rest } = genericData.generalInfo;
					return mutateAsync({
						appData: {
							id: '',
							...rest,
							applicationData: {
								appMaintenance,
								operationSupplier,
								...(data?.technicalInfo || {})
							}
						}
					});
				}
			)}
		>
			{generateGeneralInfo()}
			{generateTechnicalInfo()}
		</CreateTearsheet>
	);
};
export default NewApplicationModal;
