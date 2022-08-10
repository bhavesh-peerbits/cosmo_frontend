import ApiError from '@api/ApiError';
import useCreateNewProcedure from '@api/narrative-admin/useCreateNewProcedure';
import useGetProcedures from '@api/procedures/useGetProcedures';
import {
	Button,
	ComposedModal,
	Form,
	Grid,
	InlineNotification,
	Layer,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextInput
} from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import Procedure from '@model/Procedure';
import { useEffect, useMemo } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface CreateProcedureForm {
	name: string;
	controlObjectives: string[];
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
		control,
		register,
		reset,
		handleSubmit,
		getValues,
		formState: { errors, isValid }
	} = useForm<CreateProcedureForm>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			description: '',
			controlObjectives: [],
			majorProcedure: ''
		}
	});

	const {
		field: {
			onChange: onChangeDescription,
			value: descriptionValue,
			ref: descriptionRef,
			onBlur: onBlurDescription
		}
	} = useController({
		control,
		name: 'description'
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
				controlObjectives: [],
				majorProcedure: ''
			}),
		[reset]
	);

	const createProcedure = () => {
		const data = getValues();
		return mutate(
			{
				procedureData: {
					id: '',
					name: data.name,
					controlObjectives: undefined, // TODO Fix
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
				<ModalBody>
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
							<TextInput
								id='control-objectives'
								labelText={t('narrativeAdmin:control-objectives')}
								{...register('controlObjectives')}
							/>
						</FullWidthColumn>
						<FullWidthColumn>
							<TextInput
								id='major-procedure'
								labelText={t('narrativeAdmin:major-procedure')}
								invalid={Boolean(errors.name)}
								invalidText={errors.name?.message}
								{...register('majorProcedure')}
							/>
						</FullWidthColumn>
						<FullWidthColumn>
							<p className='mb-3 text-text-secondary text-label-1'>
								{t('modals:description')}
							</p>
							<Layer className='bg-background'>
								<TiptapEditor
									content={descriptionValue}
									onChange={onChangeDescription}
									onBlur={onBlurDescription}
									ref={descriptionRef}
								/>
							</Layer>
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
					<Button kind='primary' type='submit' disabled={!isValid || isLoading}>
						{t('modals:create')}
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};
export default CreateProcedureModal;
