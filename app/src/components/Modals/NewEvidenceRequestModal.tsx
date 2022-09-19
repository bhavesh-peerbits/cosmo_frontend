import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	TextInput,
	Select,
	SelectItem,
	Form
} from '@carbon/react';
import { useForm } from 'react-hook-form';

type NewEvidenceRequestModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

type WorkflowType = 'type1' | 'type2' | 'type3';
type RequestType = 'type1' | 'type2' | 'type3';

interface CreateRequestForm {
	requestName: string;
	workflowType: WorkflowType;
	requestType: RequestType;
}

const NewEvidenceRequestModal = ({ isOpen, setIsOpen }: NewEvidenceRequestModalProps) => {
	const {
		register,
		reset,
		formState: { isValid, errors }
	} = useForm<CreateRequestForm>({
		defaultValues: {
			requestName: '',
			workflowType: 'type1',
			requestType: 'type1'
		},
		mode: 'onChange'
	});

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const types = [
		{ id: 1, value: 'type1' },
		{ id: 2, value: 'type2' },
		{ id: 3, value: 'type3' }
	];

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title='New Request' closeModal={cleanUp} />
			<ModalBody className='m-0 space-y-4 pb-9'>
				<Form className='space-y-6'>
					<TextInput
						id='request-name'
						labelText='Request Name'
						placeholder='Request Name'
						invalidText={errors.requestName?.message}
						invalid={Boolean(errors.requestName)}
						{...register('requestName', { required: true })}
					/>
					<Select
						id='workflow-types'
						labelText='Workflow Type'
						{...register('workflowType', {
							required: true
						})}
					>
						{types.map(type => (
							<SelectItem key={type.id} text={type.value} value={type.value} />
						))}
					</Select>
					<Select
						id='request-types'
						labelText='Request Type'
						{...register('requestType', {
							required: true
						})}
					>
						{types.map(type => (
							<SelectItem key={type.id} text={type.value} value={type.value} />
						))}
					</Select>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					Cancel
				</Button>
				<Button disabled={!isValid}>Create Request</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default NewEvidenceRequestModal;
