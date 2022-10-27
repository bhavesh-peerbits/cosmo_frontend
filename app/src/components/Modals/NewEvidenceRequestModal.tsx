import useCreateDraft from '@api/evidence-request/useCreateDraft';
import useGetAllUniqueEvidenceNames from '@api/evidence-request/useGetAllUniqueEvidenceNames';
import useGetNewDraftParameter from '@api/evidence-request/useGetNewDraftParameter';
import { TextInput, Select, SelectItem, Grid } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import FullWidthColumn from '@components/FullWidthColumn';
import Framework from '@model/Framework';
import PhaseType from '@model/PhaseType';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FrameworkStep from './FrameworkStep';

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
	const { mutate } = useCreateDraft(); // TODO Handle errors
	const { data: parameters } = useGetNewDraftParameter();
	const { data: requestNames } = useGetAllUniqueEvidenceNames();
	const [selectedLeaves, setSelectedLeaves] = useState<Framework[]>([]);

	const {
		register,
		reset,
		watch,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<CreateRequestForm>({
		mode: 'onChange'
	});
	const requestType = watch('requestType');

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const submitRequest = (data: CreateRequestForm) => {
		return mutate(
			{
				draftData: {
					name: data.requestName,
					requestType:
						requestType === 'FREE'
							? ['FREE']
							: selectedLeaves.map(leaf => leaf.code as string),
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
	const generateBasicInfoStep = useCallback(() => {
		return (
			<CreateTearsheetStep
				keyValue='basicInfoStep'
				title={t('evidenceRequest:basic-info')}
				disableSubmit={!isValid}
			>
				<Grid fullWidth className='space-y-7'>
					<FullWidthColumn>
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
					</FullWidthColumn>
					<FullWidthColumn>
						{' '}
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
					</FullWidthColumn>
					<FullWidthColumn>
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
					</FullWidthColumn>
					<FullWidthColumn>
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
					</FullWidthColumn>
				</Grid>
			</CreateTearsheetStep>
		);
	}, [
		errors.requestName,
		isValid,
		parameters?.phaseType,
		parameters?.requestType,
		parameters?.workflowName,
		register,
		requestNames,
		t
	]);

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText={t('modals:create')}
			cancelButtonText={t('modals:cancel')}
			backButtonText={t('modals:back')}
			nextButtonText={t('modals:next')}
			className='bg-background-brand'
			title={t('evidenceRequest:create-new-request')}
			open={isOpen}
			onClose={() => {
				cleanUp();
				setIsOpen(false);
			}}
			onRequestSubmit={handleSubmit(submitRequest)}
		>
			{generateBasicInfoStep()}
			{requestType !== 'FREE' && (
				<FrameworkStep
					requestType={requestType}
					setSelectedLeaves={setSelectedLeaves}
					selectedLeaves={selectedLeaves}
				/>
			)}
		</CreateTearsheet>
	);
};
export default NewEvidenceRequestModal;
