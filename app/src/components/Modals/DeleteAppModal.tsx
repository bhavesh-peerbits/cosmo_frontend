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

type DeleteModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	id: string;
};

const DeleteAppModal = ({ isOpen, setIsOpen, id }: DeleteModalProps) => {
	const { mutate, isLoading, isError, error, reset } = useDeleteApp();
	const navigate = useNavigate();

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
			<ModalHeader title='Confirm Delete' closeModal={cleanUp} />
			<ModalBody>
				<span>Are you sure you want to delete the element?</span>
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
					Cancel
				</Button>
				<Button kind='danger' disabled={isLoading} onClick={deleteElement}>
					Delete
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteAppModal;
