import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from '@carbon/react';
import { useTranslation } from 'react-i18next';

type BlockUserModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	user: string;
};

const BlockUserModal = ({ isOpen, setIsOpen, user }: BlockUserModalProps) => {
	const { t } = useTranslation('modals');
	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('block-user')} closeModal={cleanUp} />
			<ModalBody>
				<span>{t('body-block', { user })}</span>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button kind='danger'>{t('block')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default BlockUserModal;
