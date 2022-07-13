import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from '@carbon/react';

type BlockUserModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const BlockUserModal = ({ isOpen, setIsOpen }: BlockUserModalProps) => {
	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title='Block User' closeModal={cleanUp} />
			<ModalBody>
				<span>Block</span>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					Cancel
				</Button>
				<Button kind='danger'>Block</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default BlockUserModal;
