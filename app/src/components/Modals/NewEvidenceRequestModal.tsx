import ApiError from '@api/ApiError';
import useCreateDraft from '@api/evidence-request/useCreateDraft';
import useGetNewDraftParameter from '@api/evidence-request/useGetNewDraftParameter';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	TextInput,
	Select,
	SelectItem,
	Form,
	InlineNotification
} from '@carbon/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type NewEvidenceRequestModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

interface CreateRequestForm {
	requestName: string;
	workflowType: string;
	requestType: string;
}

const NewEvidenceRequestModal = ({ isOpen, setIsOpen }: NewEvidenceRequestModalProps) => {
	const { t } = useTranslation([
		'evidenceRequest',
		'modals',
		'applicationInfo',
		'userSelect'
	]);
	const existingRequestNames: string[] = []; // TODO da modificare con l'endpoint dei nomi univoci
	const { mutate, isError, error } = useCreateDraft();
	const { data: parameters } = useGetNewDraftParameter();

	const {
		register,
		reset,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<CreateRequestForm>({
		defaultValues: {
			requestName: '',
			workflowType: undefined,
			requestType: undefined
		},
		mode: 'onChange'
	});

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const createDraft = (data: CreateRequestForm) => {
		return mutate(
			{
				draftData: {
					name: data.requestName,
					requestType: data.requestType,
					workflowname: data.workflowType
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
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('evidenceRequest:create-new-request')} closeModal={cleanUp} />
			<Form className='space-y-6' onSubmit={handleSubmit(createDraft)}>
				<ModalBody className='m-0 space-y-4 pb-9'>
					<TextInput
						id='request-name'
						labelText={t('evidenceRequest:request-name')}
						placeholder={t('evidenceRequest:request-name')}
						invalidText={errors.requestName?.message}
						invalid={Boolean(errors.requestName)}
						{...register('requestName', {
							validate: name =>
								!existingRequestNames.includes(name.toLowerCase()) ||
								t('applicationInfo:name-exists')
						})}
					/>
					<Select
						id='workflow-types'
						labelText={`${t('evidenceRequest:workflow-type')} *`}
						{...register('workflowType', {
							required: true
						})}
					>
						<SelectItem
							hidden
							value='workflow-placeholder'
							text={t('userSelect:choose-option')}
						/>
						{parameters?.workflowName.map(workflowName => (
							<SelectItem text={workflowName} value={workflowName} key={workflowName} />
						))}
					</Select>
					<Select
						id='request-types'
						labelText={`${t('evidenceRequest:request-type')} *`}
						{...register('requestType', {
							required: true
						})}
					>
						<SelectItem
							hidden
							value='request-types-placeholder'
							text={t('userSelect:choose-option')}
						/>
						{parameters?.requestType.map(type => (
							<SelectItem text={type} value={type} key={type} />
						))}
					</Select>

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
					<Button type='submit' disabled={!isValid}>
						{t('evidenceRequest:create-new-request')}
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};
export default NewEvidenceRequestModal;
