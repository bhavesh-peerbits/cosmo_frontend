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
	TextInput
} from '@carbon/react';
import { useForm } from 'react-hook-form';
import SingleUserSelect from '@components/SingleUserSelect';
import FullWidthColumn from '@components/FullWidthColumn';
import User from '@model/common/User';
import DatePickerWrapper from '@components/DatePickerWrapper';
import useReviewApp from '@api/management/useReviewApp';
import ApiError from '@api/ApiError';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { startOfTomorrow } from 'date-fns';

type AppReviewModalProps = {
	appId: string;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	owner: User;
};

type FormData = {
	reviewer: User;
	reviewDate: Date;
	owner: User;
};

const ApplicationReviewModal = ({
	appId,
	isOpen,
	setIsOpen,
	owner
}: AppReviewModalProps) => {
	const { t } = useTranslation('modals');
	const { mutate, error, isError, isLoading, reset } = useReviewApp(appId);
	const {
		control,
		reset: resetForm,
		handleSubmit,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange'
	});

	const cleanUp = () => {
		reset();
		resetForm();
		setIsOpen(false);
	};

	const sendMail = (data: FormData) => {
		mutate(
			{
				endDate: data.reviewDate
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
					title={t('application-review')}
					label={`${t('fill-field')} "${t('send-email')}".`}
					closeModal={() => cleanUp()}
				/>
				<ModalBody>
					<Grid>
						<Column lg={8} md={4} sm={4} className='mb-5'>
							<SingleUserSelect
								level={2}
								helperText={t('helper-user')}
								label={t('reviewer')}
								name='reviewer'
								defaultValue={owner}
								rules={{
									required: {
										value: true,
										message: 'A owner is required'
									}
								}}
								readOnly
								control={control}
							/>
						</Column>
						<Column lg={8} md={4} sm={4} className='mb-5'>
							<TextInput
								readOnly
								id='email-address'
								placeholder='example@email.com'
								labelText={t('label-email')}
								value={owner.email || ''}
								helperText={t('helper-email')}
								className='w-full grow-0'
							/>
						</Column>

						<FullWidthColumn>
							<DatePickerWrapper
								control={control}
								name='reviewDate'
								label={t('expiry-date')}
								rules={{
									required: {
										value: true,
										message: `${t('select-date')}`
									}
								}}
								minDate={startOfTomorrow()}
							/>
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
						{t('cancel')}
					</Button>
					<Button
						type='submit'
						disabled={!isValid || isLoading}
						onClick={handleSubmit(sendMail)}
					>
						{isLoading ? t('sending-email') : t('send-email')}
					</Button>
				</ModalFooter>
			</ComposedModal>
		</Form>
	);
};
export default ApplicationReviewModal;
