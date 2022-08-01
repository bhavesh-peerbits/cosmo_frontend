import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from '@carbon/react';
import { useTranslation } from 'react-i18next';

type DeleteUploadModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const DeleteUploadModal = ({ isOpen, setIsOpen }: DeleteUploadModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tUser } = useTranslation('userRevalidation');
	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>
					{tUser('confirm-delete-upload', { application: 'NOME APPLICAZIONE' })}
				</span>
				{/* // TODO Add errors message */}
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
export default DeleteUploadModal;
