import {
	Button,
	Column,
	ComposedModal,
	Form,
	Grid,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea,
	TextInput
} from '@carbon/react';
import { useForm, useWatch } from 'react-hook-form';
import SingleUserSelect from '@components/SingleUserSelect';
import FullWidthColumn from '@components/FullWidthColumn';
import User from '@model/User';
import DatePickerWrapper from '@components/DatePickerWrapper';
import useReviewApp from '@api/management/useReviewApp';
import ApiError from '@api/ApiError';
import cx from 'classnames';

type AppReviewModalProps = {
	appId: string;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

type FormData = {
	reviewer: User;
	reviewDate: Date;
	description: string;
};

const ApplicationReviewModal = ({ appId, isOpen, setIsOpen }: AppReviewModalProps) => {
	const { mutate, error, isError, isLoading, reset } = useReviewApp(appId);
	const {
		control,
		reset: resetForm,
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange'
	});

	const reviewerMail = useWatch({
		control,
		name: 'reviewer.email'
	});

	const cleanUp = () => {
		reset();
		resetForm();
		setIsOpen(false);
	};

	const sendMail = (data: FormData) => {
		mutate(
			{
				reviewer: data.reviewer,
				expireDate: data.reviewDate,
				description: data.description
			},
			{
				onSuccess: cleanUp
			}
		);
	};

	return (
		<Form>
			<ComposedModal preventCloseOnClickOutside open={isOpen} onClose={() => cleanUp()}>
				<ModalHeader
					title='Application Review'
					label='Please enter the fields above, then press Send Email.'
					closeModal={() => cleanUp()}
				/>
				<ModalBody>
					<Grid>
						<Column lg={8} md={4} sm={4} className='mb-5'>
							<SingleUserSelect
								level={2}
								helperText='The review request will be sent to this user'
								label='Reviewer'
								name='reviewer'
								rules={{
									required: {
										value: true,
										message: 'Please select a reviewer'
									}
								}}
								control={control}
							/>
						</Column>
						<Column lg={8} md={4} sm={4} className='mb-5'>
							<TextInput
								readOnly
								id='email-address'
								placeholder="User's email address"
								labelText='Email Address'
								value={reviewerMail || ''}
								helperText='The review request will be sent to this email address'
								className='w-full grow-0'
							/>
						</Column>

						<FullWidthColumn className='mb-6'>
							<DatePickerWrapper
								control={control}
								name='reviewDate'
								label='Expiry Date of the Review'
								rules={{
									required: {
										value: true,
										message: 'Please select a date'
									}
								}}
								minDate={new Date()}
							/>
						</FullWidthColumn>
						<FullWidthColumn className='mb-6'>
							<TextArea labelText='Description' {...register('description')} />
						</FullWidthColumn>
						<FullWidthColumn>
							<div
								className={cx(
									'flex items-center justify-center transition-all duration-fast-2 ease-entrance-expressive',
									{
										'opacity-0': !isError
									}
								)}
							>
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
						</FullWidthColumn>
					</Grid>
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={() => cleanUp()}>
						Cancel
					</Button>
					<Button
						type='submit'
						disabled={!isValid || isLoading}
						onClick={handleSubmit(sendMail)}
					>
						Send Email
					</Button>
				</ModalFooter>
			</ComposedModal>
		</Form>
	);
};
export default ApplicationReviewModal;
