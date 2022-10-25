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
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import evidenceRequestActionModal from '@store/evidence-request/evidenceRequestActionModal';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

interface StepUploadForm {
	publicComment: string;
}
type ActionModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	steps: EvidenceRequestStep[];
	currentStep: number;
};

const ActionEvidenceRequestModal = ({
	isOpen,
	setIsOpen,
	steps,
	currentStep
}: ActionModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest']);
	const action = useRecoilValue(evidenceRequestActionModal);
	const cleanUp = () => {
		setIsOpen(false);
	};
	const handleSaveStep = () => {
		// mutate({ step }, { onSuccess: () => cleanUp() });
	};
	const { register, handleSubmit } = useForm<StepUploadForm>({
		mode: 'onChange',
		defaultValues: {
			publicComment: steps.filter(step => step.stepOrder === currentStep)[0].stepInfo
				?.publicComment
		}
	});
	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t(`evidenceRequest:${action}`)} closeModal={cleanUp} />
			<ModalBody>
				<Form className='space-y-5'>
					{action === 'change-request' && (
						<Select id='step'>
							{steps.map(step => (
								<SelectItem
									text={`${step.stepOrder}-${step.type}`}
									value={step.stepOrder}
									key={step.stepOrder}
								/>
							))}
						</Select>
					)}
					<TextArea
						labelText={t('evidenceRequest:public-comment')}
						{...register('publicComment')}
					/>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='primary' onClick={handleSubmit(handleSaveStep)}>
					{t('evidenceRequest:save')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};

export default ActionEvidenceRequestModal;
