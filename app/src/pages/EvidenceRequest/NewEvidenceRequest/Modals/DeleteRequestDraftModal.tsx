import ApiError from '@api/ApiError';
import useDeleteDraft from '@api/evidence-request/useDeleteDraftById';
import {
	Button,
	ComposedModal,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type DeleteRequestDraftModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	draftId: string;
};

const DeleteRequestDraftModal = ({
	isOpen,
	setIsOpen,
	draftId
}: DeleteRequestDraftModalProps) => {
	const { t } = useTranslation(['modals', 'evidenceRequest']);
	const { mutate, isLoading, isError, error, reset } = useDeleteDraft();
	const navigate = useNavigate();

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};
	const deleteElement = () => {
		mutate(
			{ draftId },
			{
				onSuccess: () => {
					cleanUp();
					navigate('/new-evidence-request');
				}
			}
		);
	};
	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp} className='z-[9999]'>
			<ModalHeader title={t('modals:confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>{t('evidenceRequest:confirm-delete')}</span>
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
					{t('modals:cancel')}
				</Button>
				<Button kind='danger' disabled={isLoading} onClick={deleteElement}>
					{t('modals:delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteRequestDraftModal;
