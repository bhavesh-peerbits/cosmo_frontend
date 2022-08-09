import {
	Button,
	ComposedModal,
	Form,
	Grid,
	Layer,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextInput
} from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface CreateProcedureForm {
	name: string;
	controlObjectives: Set<string>;
	description: string;
}

type CreateProcedureModalProps = {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
};
const CreateProcedureModal = ({ isOpen, setIsOpen }: CreateProcedureModalProps) => {
	const { t } = useTranslation('modals');

	const {
		control,
		register,
		reset,
		formState: { errors, isValid }
	} = useForm<CreateProcedureForm>({
		mode: 'onChange'
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
	};

	return (
		<ComposedModal open={isOpen} onClose={cleanUp} preventCloseOnClickOutside>
			<ModalHeader title='New Procedure' closeModal={cleanUp} />
			<ModalBody>
				<Form>
					<Grid className='space-y-5'>
						<FullWidthColumn>
							<TextInput
								id='procedure-name'
								labelText='Procedure Name *'
								invalid={Boolean(errors.name)}
								invalidText={errors.name?.message}
								{...register('name', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
						</FullWidthColumn>
						<FullWidthColumn>
							<TextInput id='control-objectives' labelText='Control Objectives' />
						</FullWidthColumn>
						<FullWidthColumn>
							<p className='mb-3 text-text-secondary text-label-1'>Description</p>
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
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button kind='primary' type='submit' disabled={!isValid}>
					{t('create')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default CreateProcedureModal;
