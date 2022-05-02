import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';

type DeleteModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	itemToDelete: string;
};

const DeleteModal = ({ isOpen, setIsOpen, itemToDelete }: DeleteModalProps) => {
	return (
		<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
			<ModalHeader title='Confirm Delete' closeModal={() => setIsOpen(false)} />
			<ModalBody className='flex'>
				Are you sure you want to delete {itemToDelete}?
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
				<Button kind='danger'>Delete</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteModal;
