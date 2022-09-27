import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useTranslation } from 'react-i18next';

type DeleteRequestModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const DeleteRequestModal = ({ isOpen, setIsOpen }: DeleteRequestModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest']);

	const cleanUp = () => {
		setIsOpen(false);
		// TODO inserire reset dopo l'utilizzo endpoint
	};

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp} className='z-[9999]'>
			<ModalHeader title={t('modals:confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>{t('evidenceRequest:confirm-delete')}</span>
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
				)} //TODO Rimuovere commenti dopo aver utilizzato endpoint */}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='danger'>
					{/* // TODO Inserire disabilitato per isLoading */}
					{t('modals:delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteRequestModal;
