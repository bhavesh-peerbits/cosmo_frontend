import {
	Grid,
	ComposedModal,
	Column,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from '@carbon/react';

type MultipleGenerateModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const MultipleGenerateModal = ({ isOpen, setIsOpen }: MultipleGenerateModalProps) => {
	return (
		<Grid fullWidth narrow>
			<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
				<Column>
					<ModalHeader title='Generate Narratives' closeModal={() => setIsOpen(false)} />
				</Column>
				<ModalBody>
					<Column lg={16} md={8} sm={4}>
						<div>
							<div className='flex space-x-5 py-5'>
								<div className='flex w-1/2 space-x-3'>
									<div className='text-heading-compact-1'>Application:</div>
									<div>ApplicationName</div>
								</div>
								<div className='flex w-1/2 space-x-3'>
									<div className='text-heading-compact-1'>Narrative Name:</div>
									<div>NarrativeName</div>
								</div>
							</div>
							<div className='flex space-x-5 py-5'>
								<div className='flex w-1/2 space-x-3'>
									<div className='text-heading-compact-1'>Application:</div>
									<div>ApplicationName</div>
								</div>
								<div className='flex w-1/2 space-x-3'>
									<div className='text-heading-compact-1'>Narrative Name:</div>
									<div>NarrativeName</div>
								</div>
							</div>
						</div>
					</Column>
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button>Generate Narrative</Button>
				</ModalFooter>
			</ComposedModal>
		</Grid>
	);
};
export default MultipleGenerateModal;
