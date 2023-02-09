import useCreateDraft from '@api/evidence-request/useCreateDraft';
import { CreateTearsheet } from '@components/CreateTearsheet';
import Framework from '@model/Framework';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import RequestBasicInfo, {
	CreateRequestForm
} from '@pages/EvidenceRequest/NewEvidenceRequestDashboard/Components/RequestBasicInfo';
import FrameworkSelection from '@pages/EvidenceRequest/NewEvidenceRequestDashboard/Components/FrameworkSelection';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';

type NewEvidenceRequestModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const NewEvidenceRequestModal = ({ isOpen, setIsOpen }: NewEvidenceRequestModalProps) => {
	const { t } = useTranslation([
		'evidenceRequest',
		'modals',
		'applicationInfo',
		'userSelect'
	]);
	const { mutate } = useCreateDraft(); // TODO Handle errors
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
	useEffect(() => {
		setSelectedLeaves([]);
	}, [requestType]);

	const submitRequest = (data: CreateRequestForm) => {
		return mutate(
			{
				draftData: {
					name: data.requestName,
					requestType:
						requestType === 'FREE' ? ['FREE'] : selectedLeaves.map(leaf => leaf.code),
					frameworkName:
						requestType === 'FREE'
							? ['FREE']
							: selectedLeaves.map(leaf => leaf.name as string),
					workflowname: data.workflow,
					phaseTypeId: data.phaseTypeId
				}
			},
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};
	const generateRequestBasicInfo = useCallback(
		() => (
			<CreateTearsheetStep
				keyValue='basicInfoStep'
				title={t('evidenceRequest:basic-info')}
				disableSubmit={!isValid}
			>
				<RequestBasicInfo register={register} errors={errors} />
			</CreateTearsheetStep>
		),
		[errors, isValid, register, t]
	);

	const generateFrameworkSelection = useCallback(
		() => (
			<CreateTearsheetStep
				keyValue='frameworkStep'
				title='Framework'
				includeStep={requestType !== 'FREE'}
				className='overflow-auto'
				disableSubmit={selectedLeaves.length === 0}
			>
				<FrameworkSelection
					requestType={requestType}
					selectedLeaves={selectedLeaves}
					setSelectedLeaves={setSelectedLeaves}
				/>
			</CreateTearsheetStep>
		),
		[requestType, selectedLeaves]
	);

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
			{generateRequestBasicInfo()}
			{generateFrameworkSelection()}
		</CreateTearsheet>
	);
};
export default NewEvidenceRequestModal;
