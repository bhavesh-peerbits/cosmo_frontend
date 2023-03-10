import useSaveStepAndGoNext from '@api/evidence-request/useSaveStepAndGoNext';
import useSaveStepAndReject from '@api/evidence-request/useSaveStepAndReject';
import useSaveStepAndReturn from '@api/evidence-request/useSaveStepAndReturn';
import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Form,
	TextArea,
	Select,
	SelectItem
} from '@carbon/react';
import EvidenceRequestStep from '@model/EvidenceRequest/EvidenceRequestStep';
import evidenceRequestActionModal from '@store/evidence-request/evidenceRequestActionModal';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

interface StepUploadForm {
	publicComment: string;
	returnStep: number;
}
type ActionModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	steps: EvidenceRequestStep[];
	currentStep: number;
	erId: string;
};

const ActionEvidenceRequestModal = ({
	isOpen,
	setIsOpen,
	steps,
	currentStep,
	erId
}: ActionModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest']);
	const [action, setAction] = useRecoilState(evidenceRequestActionModal);
	const { mutate: mutateApprove } = useSaveStepAndGoNext();
	const { mutate: mutateReject } = useSaveStepAndReject();
	const { mutate: mutateReturn } = useSaveStepAndReturn();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { isValid }
	} = useForm<StepUploadForm>({
		mode: 'onChange',
		defaultValues: {
			publicComment: steps.filter(step => step.stepOrder === currentStep)[0].stepInfo
				?.publicComment
		}
	});
	const publicComment = watch('publicComment');
	useEffect(() => {
		setValue(
			'publicComment',
			steps.filter(step => step.stepOrder === currentStep)[0].stepInfo?.publicComment ||
				''
		);
	}, [steps, currentStep, setValue]);

	const cleanUp = () => {
		reset({
			publicComment: steps.filter(step => step.stepOrder === currentStep)[0].stepInfo
				?.publicComment
		});
		setIsOpen(false);
		setAction('approve');
	};

	const handleSaveStep = (data: StepUploadForm) => {
		const stepToSave = steps.filter(step => step.stepOrder === currentStep)[0];
		stepToSave.stepInfo = {
			publicComment: data.publicComment,
			privateComment: undefined
		};
		if (action === 'approve') {
			mutateApprove(
				{
					erId,
					step: stepToSave
				},
				{ onSuccess: cleanUp }
			);
		}
		if (action === 'change-request') {
			mutateReturn(
				{
					erId,
					step: stepToSave,
					stepToReturn: data.returnStep
				},
				{ onSuccess: cleanUp }
			);
		}
		if (action === 'reject') {
			mutateReject(
				{
					erId,
					step: stepToSave
				},
				{ onSuccess: cleanUp }
			);
		}
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t(`evidenceRequest:${action}`)} closeModal={cleanUp} />
			<ModalBody>
				<Form className='space-y-5'>
					{action === 'change-request' && (
						<Select id='step' {...register('returnStep')}>
							{steps
								.filter(st => st.stepOrder < currentStep)
								.map(step => (
									<SelectItem
										text={`${step.stepOrder}-${step.type}`}
										value={step.stepOrder}
										key={step.stepOrder}
									/>
								))}
						</Select>
					)}
					<TextArea
						labelText={`${t('evidenceRequest:public-comment')} ${
							action !== 'approve' ? '*' : ''
						}`}
						{...register('publicComment', {
							required: {
								value: action !== 'approve',
								message: t('modals:field-required')
							}
						})}
					/>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button
					kind='primary'
					onClick={handleSubmit(handleSaveStep)}
					disabled={action !== 'approve' && (!isValid || publicComment === '')}
				>
					{t('evidenceRequest:save')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};

export default ActionEvidenceRequestModal;
