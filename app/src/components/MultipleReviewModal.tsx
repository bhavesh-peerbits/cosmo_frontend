import {
	Button,
	Column,
	ComposedModal,
	DatePicker,
	DatePickerInput,
	Form,
	Grid,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea
} from '@carbon/react';

type MultipleReviewModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	type: string;
};

const MultipleReviewModal = ({ isOpen, setIsOpen, type }: MultipleReviewModalProps) => {
	const current = new Date();
	const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
	return (
		<Grid fullWidth narrow>
			<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
				<Column>
					<ModalHeader
						title={type === 'procedure' ? 'Procedure Review' : 'Application Review'}
						label='Please enter the fields above, then press Send Email.'
						closeModal={() => setIsOpen(false)}
					/>
				</Column>

				<Form>
					<ModalBody>
						<Column lg={16} md={8} sm={4} className='space-y-6'>
							<div className='flex space-x-3'>
								<div className='text-productive-heading-2'>
									Total {type === 'procedure' ? 'procedures' : 'applications'} selected to
									review:
								</div>
								<div className='text-productive-heading-2'>2</div>
							</div>

							<DatePicker datePickerType='single' allowInput minDate={date}>
								<DatePickerInput
									id='expiry-date'
									labelText='Expiry Date of the Review'
									placeholder='mm/dd/yyyy'
								/>
							</DatePicker>
							<TextArea labelText='Description' />
						</Column>
					</ModalBody>
					<ModalFooter>
						<Button kind='secondary' onClick={() => setIsOpen(false)}>
							Cancel
						</Button>
						<Button>Send Email</Button>
					</ModalFooter>
				</Form>
			</ComposedModal>
		</Grid>
	);
};
export default MultipleReviewModal;
