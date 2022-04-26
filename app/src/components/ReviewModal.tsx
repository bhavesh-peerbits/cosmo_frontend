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
	TextArea,
	TextInput
} from '@carbon/react';

type ReviewModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const ReviewModal = ({ isOpen, setIsOpen }: ReviewModalProps) => {
	const current = new Date();
	const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
	return (
		<Grid fullWidth narrow>
			<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
				<Column>
					<ModalHeader
						title='Application Review'
						label='Please enter the fields above, then press Send Email.'
						closeModal={() => setIsOpen(false)}
					/>
				</Column>

				<Form>
					<ModalBody>
						<Column lg={16} md={8} sm={4} className='space-y-6'>
							<div className='flex w-full space-x-5'>
								<TextInput
									id='email-address'
									labelText='Email Address'
									value='email'
									helperText='The review request will be sent to this email address'
									className='w-full grow-0'
								/>
								<TextInput
									id='reviewer'
									labelText='Reviewer'
									value='Reviewer Name'
									helperText='The review request will be sent to this reviewer'
									className='w-full grow-0'
								/>
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
export default ReviewModal;
