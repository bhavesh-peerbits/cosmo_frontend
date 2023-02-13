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
import User from '@model/User';
import DatePickerWrapper from '@components/DatePickerWrapper';
import ApiError from '@api/ApiError';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import useReviewProcedure from '@api/management/useReviewProcedure';
import ProcedureAppInstance from '@model/Narrative/ProcedureAppInstance';
import { startOfTomorrow } from 'date-fns';

type ProcedureReviewModalProps = {
	appId: string;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	procedure: ProcedureAppInstance;
};

type FormData = {
	reviewer: User;
	reviewDate: Date;
};

const ProcedureReviewModal = ({
	appId,
	isOpen,
	setIsOpen,
	procedure
}: ProcedureReviewModalProps) => {
	const { t } = useTranslation('modals');
	const { mutate, error, isError, isLoading, reset } = useReviewProcedure(
		appId,
		procedure.id
	);
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
			<ComposedModal
				preventCloseOnClickOutside
				open={isOpen}
				onClose={() => cleanUp()}
				className='z-[99999]'
			>
				<ModalHeader
					title={t('procedure-review')}
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
								defaultValue={procedure.owner}
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
								value={procedure.owner.email || ''}
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
						{t('send-email')}
					</Button>
				</ModalFooter>
			</ComposedModal>
		</Form>
	);
};
export default ProcedureReviewModal;
