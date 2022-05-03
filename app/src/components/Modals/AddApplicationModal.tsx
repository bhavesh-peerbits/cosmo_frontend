import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ProgressIndicator,
	ProgressStep
} from '@carbon/react';

const AddApplicationModal = () => {
	return (
		<ComposedModal open size='lg'>
			<ModalHeader title='New Application' />
			<ModalBody>
				ccc
				<ProgressIndicator currentIndex={1} onChange={() => alert('Clicked')}>
					<ProgressStep
						label='Click me'
						description='Step 1: Register a onChange event'
					/>
					<ProgressStep
						label='Really long label'
						description='The progress indicator will listen for clicks on the steps'
					/>
					<ProgressStep
						label='Third step'
						description='The progress indicator will listen for clicks on the steps'
					/>
				</ProgressIndicator>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary'>Cancel</Button>
				<Button> Add Procedure </Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default AddApplicationModal;
