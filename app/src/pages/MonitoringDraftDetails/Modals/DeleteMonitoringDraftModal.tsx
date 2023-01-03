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

const DeleteMonitoringDraftModal = ({ isOpen, setIsOpen }: DeleteModalProps) => {
	const { t } = useTranslation(['changeMonitoring', 'modals']);
	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('modals:confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>{t('changeMonitoring:confirm-delete', { draft: 'nome' })}</span>
				{/* {isError && (
					<InlineNotification
						kind='error'
						title='Error'
						hideCloseButton
						subtitle={
							(error as ApiError)?.message ||
							'An error has occurred, please try again later'
						}
					/>
				)} */}
				{/*			// TODO Edit after endpoint */}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='danger'>{t('modals:delete')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteMonitoringDraftModal;
