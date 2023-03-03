import {
	Button,
	ComposedModal,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import ApiError from '@api/ApiError';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useDeleteTemplate from '@api/document-templates/useDeleteTemplate';

type DeleteTemplatesModalProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean, id: number) => void;
	id: number;
};

const DeleteTemplatesModal = ({ isOpen, setIsOpen, id }: DeleteTemplatesModalProps) => {
	const { mutate, isLoading, isError, error, reset } = useDeleteTemplate();
	const navigate = useNavigate();
	const { t } = useTranslation('modals');

	const cleanUp = () => {
		reset();
		setIsOpen(false, 0);
	};

	const deleteElement = () => {
		mutate(
			{ templateId: id },
			{
				onSuccess: () => {
					cleanUp();
					navigate('/admin/document-templates');
				}
			}
		);
	};

	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader
				title={t('confirm-delete')}
				label='Template Name'
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>{`${t('delete-template', {
					document: 5
				})}`}</span>
				<br />
				<span>{`${t('delete-apps')}`}</span>
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
export default DeleteTemplatesModal;
