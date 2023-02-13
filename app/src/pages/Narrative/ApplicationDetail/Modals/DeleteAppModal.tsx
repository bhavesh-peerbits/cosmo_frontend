import {
	Button,
	ComposedModal,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import useDeleteApp from '@api/management/useDeleteApp';
import ApiError from '@api/ApiError';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type DeleteModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	id: string;
};

const DeleteAppModal = ({ isOpen, setIsOpen, id }: DeleteModalProps) => {
	const { mutate, isLoading, isError, error, reset } = useDeleteApp();
	const navigate = useNavigate();
	const { t } = useTranslation('modals');

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const deleteElement = () => {
		mutate(
			{ appId: id },
			{
				onSuccess: () => {
					cleanUp();
					navigate('/management');
				}
			}
		);
	};

	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('confirm-delete')} closeModal={cleanUp} />
			<ModalBody>
				<span>{`${t('delete-app')}`}</span>
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
export default DeleteAppModal;
