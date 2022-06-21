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
import { useTranslation } from 'react-i18next';

type NewApplicationProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const emptyFunc = (f: (data: undefined) => void) => () => f(undefined);

const NewApplicationModal = ({ isOpen, setIsOpen }: NewApplicationProps) => {
	const { t } = useTranslation('management');
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
				title={t('general-info')}
				disableSubmit={!isValid}
				hasFieldset={false}
				subtitle={t('basic-info')}
				description={t('flag-technical')}
				keyValue='topic'
			>
				<Stack gap={5}>
					<Checkbox
						labelText={t('include-technical')}
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
		shouldIncludeTechnicalInfo,
		t
	]);

	const generateTechnicalInfo = useCallback(
		() => (
			<CreateTearsheetStep
				keyValue='technical-info'
				title={t('technical-info')}
				subtitle={t('subtitle-techincal')}
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
			technicalRegister,
			t
		]
	);

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText={t('create')}
			cancelButtonText={t('cancel')}
			backButtonText={t('back')}
			nextButtonText={t('next')}
			description={t('create-new')}
			title={t('new-application')}
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
