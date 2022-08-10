import {
	Button,
	ComposedModal,
	Form,
	Grid,
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
import { useMemo, useState } from 'react';
import { Edit } from '@carbon/react/icons';

interface ProcedureDetailsForm {
	name: string;
	description: string;
	controlObjectives: Set<string>;
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
	const proceduresExistingName = useMemo(
		() => [...procedures.values()].map(proc => proc.name.toLowerCase()),
		[procedures]
	);

	const {
		control,
		register,
		reset,
		formState: { errors, isValid, isDirty }
	} = useForm<ProcedureDetailsForm>({
		mode: 'onChange',
		defaultValues: {
			name: procedure.name,
			description: procedure.description,
			controlObjectives: procedure.controlObjectives
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
		reset();
		setIsOpen(false);
		setIsEditing(false);
	};

	return (
		<Layer level={2}>
			<ComposedModal
				open={isOpen}
				onClose={cleanUp}
				preventCloseOnClickOutside
				className='z-[9999]'
			>
				<Form>
					<ModalHeader
						title={t('narrativeAdmin:procedure-details')}
						closeModal={cleanUp}
					/>
					<ModalBody>
						<Grid className='space-y-5'>
							<FullWidthColumn className='flex justify-between'>
								<p>{`${t('narrativeAdmin:details-subtitle')}.`}</p>
								<div className='space-x-5'>
									<Button
										size='sm'
										kind='secondary'
										disabled={!isEditing || !isDirty}
										onClick={() => {
											reset();

											setIsEditing(false);
										}}
									>
										{t('procedureInfo:discard')}
									</Button>

									<Button
										size='sm'
										kind='tertiary'
										renderIcon={Edit}
										disabled={isEditing}
										onClick={() => setIsEditing(true)}
									>
										{t('modals:edit')}
									</Button>
								</div>
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
					</ModalBody>
					<ModalFooter>
						<Button kind='secondary' onClick={cleanUp}>
							{t('modals:cancel')}
						</Button>
						<Button kind='primary' type='submit' disabled={!isValid || !isDirty}>
							{t('applicationInfo:save')}
						</Button>
					</ModalFooter>
				</Form>
			</ComposedModal>
		</Layer>
	);
};
export default ProcedureDetailsModal;
