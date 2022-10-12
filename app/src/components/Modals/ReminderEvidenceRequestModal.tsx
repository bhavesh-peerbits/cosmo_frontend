import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useTranslation } from 'react-i18next';

type CloseModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const ReminderEvidenceRequestModal = ({ isOpen, setIsOpen }: CloseModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest']);
	const cleanUp = () => {
		setIsOpen(false);
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
				<Button kind='danger'>{t('evidenceRequest:send-reminder')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};

export default ReminderEvidenceRequestModal;
