import {
	Button,
	ComposedModal,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import ApiError from '@api/ApiError';
import { useTranslation } from 'react-i18next';
import useDeleteProcedureApp from '@api/app-procedures/useDeleteProcedureApp';

type DeleteProcedureModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	procedureId: string;
	procedureAppId: string;
	appId: string;
	softDelete?: boolean;
	onDelete: () => void;
};

const DeleteProcedureModal = ({
	isOpen,
	setIsOpen,
	procedureId,
	procedureAppId,
	appId,
	softDelete,
	onDelete
}: DeleteProcedureModalProps) => {
	const { mutate, isLoading, isError, error, reset } = useDeleteProcedureApp();
	const { t } = useTranslation('modals');

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const deleteElement = () => {
		if (softDelete) {
			onDelete();
			cleanUp();
		} else {
			mutate({ appId, procedureAppId, procedureId }, { onSuccess: () => cleanUp() });
		}
	};

	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>{t('delete-procedure')}</span>
				{isError && (
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
				)}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button kind='danger' disabled={isLoading} onClick={deleteElement}>
					{t('delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteProcedureModal;
