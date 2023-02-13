import useSendReminder from '@api/evidence-request/useSendReminder';
import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import EvidenceRequest from '@model/EvidenceRequest/EvidenceRequest';
import { useTranslation } from 'react-i18next';

type CloseModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	evidenceRequest: EvidenceRequest;
};

const ReminderEvidenceRequestModal = ({
	isOpen,
	setIsOpen,
	evidenceRequest
}: CloseModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest']);
	const cleanUp = () => {
		setIsOpen(false);
	};
	const { mutate } = useSendReminder();
	const handleSendReminder = () => {
		mutate({ evidenceRequest }, { onSuccess: () => cleanUp() });
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('evidenceRequest:send-reminder')} closeModal={cleanUp} />
			<ModalBody>
				<span>{t('evidenceRequest:reminder-description')}</span>
				{/* <ModalError isError={isError} error={error as ApiError} /> */}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='primary' onClick={handleSendReminder}>
					{t('evidenceRequest:send-reminder')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};

export default ReminderEvidenceRequestModal;
