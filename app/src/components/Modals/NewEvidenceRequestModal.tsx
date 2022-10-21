/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import ApiError from '@api/ApiError';
import useCreateDraft from '@api/evidence-request/useCreateDraft';
import useGetAllUniqueEvidenceNames from '@api/evidence-request/useGetAllUniqueEvidenceNames';
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
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import PhaseType from '@model/PhaseType';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type NewEvidenceRequestModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

interface CreateRequestForm {
	requestName: string;
	workflow: string;
	requestType: string;
	phaseType: PhaseType;
}

const NewEvidenceRequestModal = ({ isOpen, setIsOpen }: NewEvidenceRequestModalProps) => {
	const { t } = useTranslation([
		'evidenceRequest',
		'modals',
		'applicationInfo',
		'userSelect'
	]);
	const { mutate, isError, error } = useCreateDraft();
	const { data: parameters } = useGetNewDraftParameter();
	const { data: requestNames } = useGetAllUniqueEvidenceNames();

	const {
		register,
		reset,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<CreateRequestForm>({
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
					workflowname: data.workflow,
					phaseType: data.phaseType
				}
			},
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};

	const basicInfoStep = useCallback(() => {
		return (
			<CreateTearsheetStep keyValue='ciao' title='ciao'>
				<TextInput
					id='request-name'
					labelText={t('evidenceRequest:request-name')}
					placeholder={t('evidenceRequest:request-name')}
					invalidText={errors.requestName?.message}
					invalid={Boolean(errors.requestName)}
					{...register('requestName', {
						validate: name =>
							!requestNames?.includes(name.toLowerCase()) ||
							t('applicationInfo:name-exists')
					})}
				/>
				<Select
					id='workflow-types'
					labelText={`${t('evidenceRequest:workflow-type')} *`}
					{...register('workflow', {
						required: true
					})}
				>
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
					{parameters?.requestType.map(type => (
						<SelectItem text={type} value={type} key={type} />
					))}
				</Select>
				<Select
					id='phase-types'
					labelText={`${t('evidenceRequest:phase-type')}`}
					{...register('phaseType')}
				>
					{parameters?.phaseType?.map(phaseType => (
						<SelectItem
							text={phaseType.name || ''}
							value={phaseType}
							key={phaseType.id}
						/>
					))}
				</Select>
			</CreateTearsheetStep>
		);
	}, []);

	return (
		<div>ciao</div>
		// <ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
		// 	<ModalHeader title={t('evidenceRequest:create-new-request')} closeModal={cleanUp} />
		// 	<ModalBody className='m-0 space-y-4 pb-9'>
		// 		<Form className='space-y-6'>
		// 			<TextInput
		// 				id='request-name'
		// 				labelText={t('evidenceRequest:request-name')}
		// 				placeholder={t('evidenceRequest:request-name')}
		// 				invalidText={errors.requestName?.message}
		// 				invalid={Boolean(errors.requestName)}
		// 				{...register('requestName', {
		// 					validate: name =>
		// 						!requestNames?.includes(name.toLowerCase()) ||
		// 						t('applicationInfo:name-exists')
		// 				})}
		// 			/>
		// 			<Select
		// 				id='workflow-types'
		// 				labelText={`${t('evidenceRequest:workflow-type')} *`}
		// 				{...register('workflow', {
		// 					required: true
		// 				})}
		// 			>
		// 				{parameters?.workflowName.map(workflowName => (
		// 					<SelectItem text={workflowName} value={workflowName} key={workflowName} />
		// 				))}
		// 			</Select>
		// 			<Select
		// 				id='request-types'
		// 				labelText={`${t('evidenceRequest:request-type')} *`}
		// 				{...register('requestType', {
		// 					required: true
		// 				})}
		// 			>
		// 				{parameters?.requestType.map(type => (
		// 					<SelectItem text={type} value={type} key={type} />
		// 				))}
		// 			</Select>
		// 			<Select
		// 				id='phase-types'
		// 				labelText={`${t('evidenceRequest:phase-type')}`}
		// 				{...register('phaseType')}
		// 			>
		// 				{parameters?.phaseType?.map(phaseType => (
		// 					<SelectItem
		// 						text={phaseType.name || ''}
		// 						value={phaseType}
		// 						key={phaseType.id}
		// 					/>
		// 				))}
		// 			</Select>

		// 			{isError && (
		// 				<div className='mt-5 flex items-center justify-center'>
		// 					<InlineNotification
		// 						kind='error'
		// 						title='Error'
		// 						hideCloseButton
		// 						subtitle={
		// 							(error as ApiError)?.message ||
		// 							'An error has occurred, please try again later'
		// 						}
		// 					/>
		// 				</div>
		// 			)}
		// 		</Form>
		// 	</ModalBody>

		// 	<ModalFooter>
		// 		<Button kind='secondary' onClick={cleanUp}>
		// 			{t('modals:cancel')}
		// 		</Button>
		// 		<Button type='submit' disabled={!isValid} onClick={handleSubmit(createDraft)}>
		// 			{t('evidenceRequest:create-new-request')}
		// 		</Button>
		// 	</ModalFooter>
		// </ComposedModal>
	);
};
export default NewEvidenceRequestModal;
