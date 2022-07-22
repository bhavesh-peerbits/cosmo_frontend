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
	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>Are you sure you want to delete this upload?</span>
				{/* {isError && (
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
			)} */}
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
