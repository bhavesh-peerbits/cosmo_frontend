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
import useDeleteProcedure from '@api/narrative-admin/useDeleteProcedure';

type DeleteProcedureModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	procedureId: string;
};

const DeleteProcedureModal = ({
	isOpen,
	setIsOpen,
	procedureId
}: DeleteProcedureModalProps) => {
	const { mutate, isLoading, isError, error, reset } = useDeleteProcedure();
	const { t } = useTranslation('modals');

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const deleteProcedure = () => {
		return mutate(
			{ procId: procedureId },
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp} className='z-[9999]'>
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
				<Button kind='danger' disabled={isLoading} onClick={deleteProcedure}>
					{t('delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteProcedureModal;
