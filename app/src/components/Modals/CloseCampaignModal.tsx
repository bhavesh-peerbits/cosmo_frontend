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

const CloseCampaignModal = ({ isOpen, setIsOpen }: CloseModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tUser } = useTranslation('userRevalidation');

	const cleanUp = () => {
		setIsOpen(false);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={tUser('close-campaign')} closeModal={cleanUp} />
			<ModalBody>
				<span>{tUser('confirm-close', { campaign: 'Campaign name' })}</span>
				{/* //TODO fix campaign name */}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button kind='danger'>{tUser('close')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default CloseCampaignModal;
