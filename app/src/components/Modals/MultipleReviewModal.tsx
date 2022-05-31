import {
	Button,
	Column,
	ComposedModal,
	Form,
	Grid,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea,
	TextInput
} from '@carbon/react';
import DatePickerWrapper from '@components/DatePickerWrapper';
import SingleUserSelect from '@components/SingleUserSelect';
import Application from '@model/Application';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import User from '@model/User';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormData = {
	reviewer: User;
	reviewDate: Date;
	description: string;
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
	const { t } = useTranslation('modals');
	const {
		control,
		reset: resetForm,
		register,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange'
	});
	const cleanUp = () => {
		resetForm();
		setIsOpen(false);
	};

	const uniqueOwners = [
		...new Map(items.map(item => item.owner).map(owner => [owner.id, owner])).values()
	];

	return (
		<Form>
			<Grid fullWidth narrow>
				<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
					<Column>
						<ModalHeader
							title={
								type === 'procedure'
									? `${t('procedure-review')}`
									: `${t('application-review')}`
							}
							label={`${t('fill-field')} "${t('send-email')}".`}
							closeModal={() => setIsOpen(false)}
						/>
					</Column>

					<ModalBody>
						<Grid>
							<Column lg={16} md={8} sm={4}>
								<div className='mb-5 flex space-x-3'>
									<div className='text-productive-heading-2'>
										{type === 'procedure'
											? `${t('procedures-selected')}`
											: `${t('applications-selected')}`}
										:
									</div>
									<div className='text-productive-heading-2'>{items?.length}</div>
								</div>

								{uniqueOwners.map(owner => {
									return (
										<Grid>
											<Column lg={8} md={4} sm={4} className='mb-5'>
												<SingleUserSelect
													level={2}
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
													className='w-full grow-0'
												/>
											</Column>
										</Grid>
									);
								})}
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
								<TextArea labelText={t('description')} {...register('description')} />
							</Column>
						</Grid>
					</ModalBody>
					<ModalFooter>
						<Button kind='secondary' onClick={() => cleanUp()}>
							{t('cancel')}
						</Button>
						<Button type='submit' disabled={!isValid}>
							{t('send-email')}
						</Button>
					</ModalFooter>
				</ComposedModal>
			</Grid>
		</Form>
	);
};
export default MultipleReviewModal;
