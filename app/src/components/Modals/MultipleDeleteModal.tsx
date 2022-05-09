import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';

type MultipleDeleteModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	totalSelected: number;
};

const MultipleDeleteModal = ({
	isOpen,
	setIsOpen,
	totalSelected
}: MultipleDeleteModalProps) => {
	return (
		<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
			<ModalHeader title='Confirm Delete' closeModal={() => setIsOpen(false)} />
			<ModalBody className='flex'>
				Are you sure you want to delete {totalSelected} applications?
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
export default MultipleDeleteModal;
