import ApiError from '@api/ApiError';
import useCreateInstanceForApp from '@api/app-instances/useCreateInstanceForApp';
import { Form, TextInput, TextArea, InlineNotification } from '@carbon/react';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import Application from '@model/Application';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type NewInstanceFormData = {
	name: string;
	description: string;
};

type AddNewInstanceModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	application: Application;
	allInstancesNames?: string[];
};
const AddNewInstanceModal = ({
	isOpen,
	setIsOpen,
	application,
	allInstancesNames
}: AddNewInstanceModalProps) => {
	const { t } = useTranslation(['modals', 'applicationInstances', 'applicationInfo']);
	const {
		mutate,
		isError,
		error,
		isLoading,
		reset: resetApi
	} = useCreateInstanceForApp();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid }
	} = useForm<NewInstanceFormData>({
		mode: 'onChange',
		defaultValues: { name: '', description: '' }
	});

	const cleanUp = () => {
		setIsOpen(false);
		resetApi();
		reset();
	};

	const createInstance = (data: NewInstanceFormData) => {
		return mutate(
			{
				appId: application.id,
				instance: {
					application,
					id: '',
					name: data.name,
					description: data.description
				}
			},
			{ onSuccess: cleanUp }
		);
	};

	return (
		<TearsheetNarrow
			hasCloseIcon
			label={application.name}
			title={t('applicationInstances:create-new-instance')}
			open={isOpen}
			onClose={cleanUp}
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-send-focal-point'
				},
				{
					label: t('modals:create'),
					id: 'send-focal-point',
					disabled: !isValid || isLoading,
					onClick: handleSubmit(createInstance)
				}
			]}
		>
			<Form className='space-y-5 px-5'>
				<TextInput
					id='new-instance-input-name'
					labelText={`${t('applicationInstances:instance-name')} *`}
					placeholder={t('applicationInstances:instance-name-placeholder')}
					invalidText={errors.name?.message}
					invalid={Boolean(errors.name)}
					{...register('name', {
						required: {
							value: true,
							message: `${t('modals:field-required')}`
						},
						validate: name =>
							!allInstancesNames?.includes(name.toLowerCase()) ||
							t('applicationInfo:name-exists')
					})}
				/>
				{/* //TODO Fix with register when carbon bug is fixed */}
				<TextArea
					id='new-instance-input-description'
					labelText={t('applicationInstances:description')}
					placeholder={t('applicationInstances:instance-description-placeholder')}
					{...register('description')}
				/>
				{isError && (
					<div className='mt-5 flex items-center justify-center'>
						<InlineNotification
							kind='error'
							title='Error'
							hideCloseButton
							subtitle={
								(error as ApiError)?.message ||
								'An error has occurred, please try again later'
							}
						/>
					</div>
				)}
			</Form>
		</TearsheetNarrow>
	);
};
export default AddNewInstanceModal;
