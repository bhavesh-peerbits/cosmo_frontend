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
};

const DeleteModal = ({ isOpen, setIsOpen }: DeleteModalProps) => {
	return (
		<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
			<ModalHeader title='Delete Application' closeModal={() => setIsOpen(false)} />
			<ModalBody className='flex'>
				Are you sure you want to delete Application Name?
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
				<Button kind='danger'>Delete Application</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteModal;
