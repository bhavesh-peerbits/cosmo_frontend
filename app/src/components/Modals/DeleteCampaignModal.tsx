import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useTranslation } from 'react-i18next';

type DeleteModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const DeleteCampaignModal = ({ isOpen, setIsOpen }: DeleteModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tUser } = useTranslation('userRevalidation');

	const cleanUp = () => {
		setIsOpen(false);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>{tUser('confirm-delete', { campaign: 'Campaign name' })}</span>
				{/* //TODO fix campaign name */}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button kind='danger'>{t('delete')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteCampaignModal;
