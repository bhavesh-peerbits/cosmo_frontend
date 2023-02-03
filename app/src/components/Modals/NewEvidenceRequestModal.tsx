import useCreateDraft from '@api/evidence-request/useCreateDraft';
import { CreateTearsheet } from '@components/CreateTearsheet';
import Framework from '@model/Framework';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import RequestBasicInfo, {
	CreateRequestForm
} from '@components/EvidenceRequest/RequestBasicInfo';
import FrameworkSelection from '@components/EvidenceRequest/FrameworkSelection';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import { InlineNotification } from '@carbon/react';
import ApiError from '@api/ApiError';

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
	const { mutate, isError, error, isLoading, reset: resetApi } = useCreateDraft();
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
		resetApi();
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
				disableSubmit={!isValid || isLoading}
			>
				<RequestBasicInfo register={register} errors={errors} />
			</CreateTearsheetStep>
		),
		[errors, isValid, register, t, isLoading]
	);

	const generateFrameworkSelection = useCallback(
		() => (
			<CreateTearsheetStep
				keyValue='frameworkStep'
				title='Framework'
				includeStep={requestType !== 'FREE'}
				className='overflow-auto'
				disableSubmit={isLoading || selectedLeaves.length === 0}
			>
				<Suspense>
					<FrameworkSelection
						requestType={requestType}
						selectedLeaves={selectedLeaves}
						setSelectedLeaves={setSelectedLeaves}
					/>
				</Suspense>
			</CreateTearsheetStep>
		),
		[requestType, selectedLeaves, isLoading]
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
		</CreateTearsheet>
	);
};
export default NewEvidenceRequestModal;
