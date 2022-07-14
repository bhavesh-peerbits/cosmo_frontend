import useGetUsers from '@api/user/useGetUsers';
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
	user: string[];
};

const BlockUserModal = ({ isOpen, setIsOpen, user }: BlockUserModalProps) => {
	const { t } = useTranslation('modals');
	const { data } = useGetUsers();
	const emailIndex = user.indexOf(
		user.filter(attribute => attribute.includes('@')).toString()
	);
	const userToEdit = data?.filter(u => u.email === user[emailIndex]).flat();
	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('block-user')} closeModal={cleanUp} />
			<ModalBody>
				<span>
					{t('body-block', {
						user: `${userToEdit && userToEdit[0].name} ${
							userToEdit && userToEdit[0].surname
						}`
					})}
				</span>
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
