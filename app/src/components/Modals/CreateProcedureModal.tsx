import ApiError from '@api/ApiError';
import useCreateNewProcedure from '@api/narrative-admin/useCreateNewProcedure';
import useGetProcedures from '@api/procedures/useGetProcedures';
import {
	Button,
	ComposedModal,
	Form,
	Grid,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea,
	TextInput
} from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import Procedure from '@model/Procedure';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface CreateProcedureForm {
	name: string;
	controlObjectives: string;
	description: string;
	majorProcedure: string;
}

type CreateProcedureModalProps = {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
};
const CreateProcedureModal = ({ isOpen, setIsOpen }: CreateProcedureModalProps) => {
	const { t } = useTranslation(['modals', 'narrativeAdmin', 'procedureInfo']);
	const { mutate, isError, error, isLoading, reset: resetApi } = useCreateNewProcedure();
	const { data: procedures = new Map<string, Procedure>() } = useGetProcedures();
	const proceduresExistingName = useMemo(
		() => [...procedures.values()].map(procedure => procedure.name.toLowerCase()),
		[procedures]
	);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<CreateProcedureForm>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			description: '',
			controlObjectives: '',
			majorProcedure: ''
		}
	});

	const cleanUp = () => {
		setIsOpen(false);
		reset();
		resetApi();
	};

	useEffect(
		() =>
			reset({
				name: '',
				description: '',
				controlObjectives: '',
				majorProcedure: ''
			}),
		[reset]
	);

	const createProcedure = (data: CreateProcedureForm) => {
		return mutate(
			{
				procedureData: {
					id: '',
					name: data.name,
					controlObjectives: [...data.controlObjectives.split(',')].filter(
						co => co.trim() !== ''
					),
					description: data.description,
					majorProcedure: data.majorProcedure
				}
			},
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};

	return (
		<ComposedModal
			open={isOpen}
			onClose={cleanUp}
			preventCloseOnClickOutside
			className='z-[9999]'
		>
			<Form onSubmit={handleSubmit(createProcedure)}>
				<ModalHeader title={t('narrativeAdmin:create-procedure')} closeModal={cleanUp} />
				<ModalBody className='max-h-[500px]'>
					<Grid className='space-y-5'>
						<FullWidthColumn>
							<TextInput
								id='procedure-name'
								labelText={`${t('narrativeAdmin:procedure-name')} *`}
								invalid={Boolean(errors.name)}
								invalidText={errors.name?.message}
								{...register('name', {
									required: {
										value: true,
										message: t('modals:field-required')
									},
									validate: name =>
										!proceduresExistingName.includes(name.toLowerCase()) ||
										`${t('procedureInfo:name-exists')}`
								})}
							/>
						</FullWidthColumn>
						<FullWidthColumn>
							<TextArea
								rows={2}
								id='control-objectives'
								labelText={t('narrativeAdmin:control-objectives')}
								{...register('controlObjectives')}
								placeholder={t('narrativeAdmin:control-obj-placeholder')}
							/>
						</FullWidthColumn>
						<FullWidthColumn>
							<TextInput
								id='major-procedure'
								labelText={t('narrativeAdmin:major-procedure')}
								invalid={Boolean(errors.majorProcedure)}
								invalidText={errors.majorProcedure?.message}
								{...register('majorProcedure')}
							/>
						</FullWidthColumn>
						<FullWidthColumn>
							<TextArea
								id='description'
								labelText={t('procedureInfo:description')}
								invalid={Boolean(errors.description)}
								invalidText={errors.description?.message}
								{...register('description')}
							/>
						</FullWidthColumn>
					</Grid>
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
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						{t('modals:cancel')}
					</Button>
					<Button
						kind='primary'
						type='submit'
						disabled={!isValid || isLoading}
						onClick={() => handleSubmit(createProcedure)}
					>
						{t('modals:create')}
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};
export default CreateProcedureModal;
