import ApiError from '@api/ApiError';
import {
	Accordion,
	AccordionItem,
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
import DatePickerWrapper from '@components/DatePickerWrapper';
import FullWidthColumn from '@components/FullWidthColumn';
import SingleUserSelect from '@components/SingleUserSelect';
import useReviewApps from '@api/management/useReviewApps';
import Application from '@model/Application';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import User from '@model/User';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

type FormData = {
	reviewer: User;
	reviewDate: Date;
	owner: User;
};

type MultipleReviewModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	type: string;
	items: Application[] | ProcedureAppInstance[];
};

const MultipleReviewModal = ({
	isOpen,
	setIsOpen,
	type,
	items
}: MultipleReviewModalProps) => {
	const itemsIds = items.map(item => +item.id);
	const { t } = useTranslation('modals');
	const {
		mutate: mutateApp,
		error: errorApp,
		isError: isErrorApp,
		isLoading: isLoadingApp,
		reset: resetApp
	} = useReviewApps();
	const {
		control,
		reset: resetForm,
		handleSubmit,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange'
	});
	const cleanUp = () => {
		resetApp();
		resetForm();
		setIsOpen(false);
	};

	const sendMail = (data: FormData) => {
		mutateApp(
			{
				endDate: data.reviewDate,
				elementIds: itemsIds
			},
			{
				onSuccess: cleanUp
			}
		);
	};
	return (
		<Form>
			<ComposedModal open={isOpen} onClose={() => cleanUp()}>
				<ModalHeader
					title={
						type === 'procedure'
							? `${t('procedure-review')}`
							: `${t('application-review')}`
					}
					label={`${t('fill-field')} "${t('send-email')}".`}
					closeModal={() => cleanUp()}
				/>

				<ModalBody>
					<Grid>
						<Column lg={16} md={8} sm={4}>
							<div className='mb-5 flex space-x-3'>
								<div className='text-productive-heading-2'>
									{type === 'procedure'
										? `${t('total-procedures')}`
										: `${t('total-applications')}`}
									:
								</div>
								<div className='text-productive-heading-2'>{items?.length}</div>
							</div>
							<Accordion className='w-full'>
								<AccordionItem
									title={
										type === 'procedure'
											? `${t('procedures-selected')}`
											: `${t('application-selected')}`
									}
									className='flex flex-col items-stretch'
								>
									{items.map(item => {
										return (
											<div className='mb-4 flex-col space-y-2'>
												<p className='text-heading-1'>{item.name}</p>
												<Grid>
													<Column lg={8} md={4} sm={4} className='mb-5'>
														<SingleUserSelect
															level={2}
															label={t('reviewer')}
															name='reviewer'
															defaultValue={item.owner}
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
															value={item.owner.email || ''}
															className='w-full grow-0'
														/>
													</Column>
												</Grid>
											</div>
										);
									})}
								</AccordionItem>
							</Accordion>
							<div className='mb-4 mt-5'>
								<DatePickerWrapper
									control={control}
									name='reviewDate'
									label={`${t('expiry-date')} *`}
									rules={{
										required: {
											value: true,
											message: `${t('select-date')}`
										}
									}}
									minDate={new Date()}
								/>
							</div>
							<FullWidthColumn>
								<div
									className={cx(
										'flex items-center justify-center transition-all duration-fast-2 ease-entrance-expressive',
										{
											'opacity-0': !isErrorApp
										}
									)}
								>
									<InlineNotification
										kind='error'
										title='Error'
										hideCloseButton
										subtitle={
											(errorApp as ApiError)?.message ||
											'An error has occurred, please try again later'
										}
									/>
								</div>
							</FullWidthColumn>
						</Column>
					</Grid>
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={() => cleanUp()}>
						{t('cancel')}
					</Button>
					<Button
						type='submit'
						disabled={!isValid || isLoadingApp}
						onClick={handleSubmit(sendMail)}
					>
						{t('send-email')}
					</Button>
				</ModalFooter>
			</ComposedModal>
		</Form>
	);
};
export default MultipleReviewModal;
