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
import { useTranslation } from 'react-i18next';

type NewEvidenceRequestModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

type WorkflowType = 'type1' | 'type2' | 'type3';
type RequestType = 'Free';

interface CreateRequestForm {
	requestName: string;
	workflowType: WorkflowType;
	requestType: RequestType;
}

const NewEvidenceRequestModal = ({ isOpen, setIsOpen }: NewEvidenceRequestModalProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const {
		register,
		reset,
		formState: { isValid, errors }
	} = useForm<CreateRequestForm>({
		defaultValues: {
			requestName: '',
			workflowType: 'type1',
			requestType: 'Free'
		},
		mode: 'onChange'
	});

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const types = [{ id: 1, value: 'Free' }];

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('evidenceRequest:create-new-request')} closeModal={cleanUp} />
			<ModalBody className='m-0 space-y-4 pb-9'>
				<Form className='space-y-6'>
					<TextInput
						id='request-name'
						labelText={t('evidenceRequest:request-name')}
						placeholder={t('evidenceRequest:request-name')}
						invalidText={errors.requestName?.message}
						invalid={Boolean(errors.requestName)}
						{...register('requestName', { required: true })}
					/>
					<Select
						id='workflow-types'
						labelText={`${t('evidenceRequest:workflow-type')} *`}
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
						labelText={`${t('evidenceRequest:request-type')} *`}
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
