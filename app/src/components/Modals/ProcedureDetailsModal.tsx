import {
	Button,
	Column,
	ComposedModal,
	Form,
	Grid,
	InlineNotification,
	Layer,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea,
	TextInput
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import Procedure from '@model/Procedure';
import FullWidthColumn from '@components/FullWidthColumn';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import { useController, useForm } from 'react-hook-form';
import useGetProcedures from '@api/procedures/useGetProcedures';
import { useEffect, useMemo, useState } from 'react';
import { Edit } from '@carbon/react/icons';
import useEditProcedure from '@api/narrative-admin/useEditProcedure';
import ApiError from '@api/ApiError';

interface ProcedureDetailsForm {
	name: string;
	description: string;
	controlObjectives: string;
	majorProcedure: string;
}

type ProcedureDetailsModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	procedure: Procedure;
};

const ProcedureDetailsModal = ({
	isOpen,
	setIsOpen,
	procedure
}: ProcedureDetailsModalProps) => {
	const { t } = useTranslation([
		'modals',
		'narrativeAdmin',
		'procedureInfo',
		'applicationInfo'
	]);
	const [isEditing, setIsEditing] = useState(false);
	const { data: procedures = new Map<string, Procedure>() } = useGetProcedures();
	const { mutate, isLoading, isError, error, reset } = useEditProcedure();
	const proceduresExistingName = useMemo(
		() => [...procedures.values()].map(proc => proc.name.toLowerCase()),
		[procedures]
	);

	const {
		control,
		register,
		handleSubmit,
		reset: resetForm,
		formState: { errors, isValid, isDirty }
	} = useForm<ProcedureDetailsForm>({
		mode: 'onChange',
		defaultValues: {
			name: procedure.name,
			description: procedure.description,
			controlObjectives: procedure.controlObjectives?.toString(),
			majorProcedure: procedure.majorProcedure
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
		resetForm();
		reset();
		setIsOpen(false);
		setIsEditing(false);
	};

	useEffect(
		() =>
			resetForm({
				name: procedure.name,
				description: procedure.description,
				controlObjectives: procedure.controlObjectives?.toString(),
				majorProcedure: procedure.majorProcedure
			}),
		[resetForm, procedure]
	);

	const editProcedure = (data: ProcedureDetailsForm) => {
		return mutate(
			{
				procedure: {
					id: procedure.id,
					name: data.name,
					controlObjectives: [...data.controlObjectives.split(',')],
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
		<Layer level={2}>
			<ComposedModal
				open={isOpen}
				onClose={cleanUp}
				preventCloseOnClickOutside
				className='z-[9999]'
			>
				<Form onSubmit={handleSubmit(editProcedure)}>
					<ModalHeader
						title={t('narrativeAdmin:procedure-details')}
						closeModal={cleanUp}
					/>
					<ModalBody>
						<Grid className='space-y-5'>
							<FullWidthColumn>
								<Grid fullWidth narrow className=' px-5 sm:flex sm:justify-between'>
									<Column sm={4} md={3} lg={6}>{`${t(
										'narrativeAdmin:details-subtitle'
									)}.`}</Column>
									<Column
										sm={4}
										md={5}
										lg={10}
										className='flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-5'
									>
										<Button
											size='sm'
											kind='secondary'
											className='min-w-full md:min-w-fit'
											disabled={!isEditing || !isDirty}
											onClick={() => {
												resetForm();
												reset();
												setIsEditing(false);
											}}
										>
											{t('procedureInfo:discard')}
										</Button>

										<Button
											size='sm'
											kind='tertiary'
											className='min-w-full md:min-w-fit'
											renderIcon={Edit}
											disabled={isEditing}
											onClick={() => setIsEditing(true)}
										>
											{t('modals:edit')}
										</Button>
									</Column>
								</Grid>
							</FullWidthColumn>
							<FullWidthColumn>
								<TextInput
									id='procedure-name'
									readOnly={!isEditing}
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
									rows={1}
									readOnly={!isEditing}
									id='control-objectives'
									labelText={t('narrativeAdmin:control-objectives')}
									{...register('controlObjectives')}
									placeholder={
										isEditing ? t('narrativeAdmin:control-obj-placeholder') : ''
									}
								/>
							</FullWidthColumn>
							<FullWidthColumn>
								<TextInput
									id='major-procedure'
									readOnly={!isEditing}
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
										readOnly={!isEditing}
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
						<Button
							kind='primary'
							type='submit'
							disabled={!isValid || !isDirty || isLoading}
						>
							{t('applicationInfo:save')}
						</Button>
					</ModalFooter>
				</Form>
			</ComposedModal>
		</Layer>
	);
};
export default ProcedureDetailsModal;
