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
import Application from '@model/Application';
import { useTranslation } from 'react-i18next';

type MultipleReviewModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	type: string;
	applications: Application[];
};

const MultipleReviewModal = ({
	isOpen,
	setIsOpen,
	type,
	applications
}: MultipleReviewModalProps) => {
	const { t } = useTranslation('modals');
	const current = new Date();
	const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
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
						<Column
							lg={16}
							md={8}
							sm={4}
							className='divide-y space-y-5 divide-solid divide-border-subtle-1'
						>
							<div className='flex space-x-3'>
								<div className='text-productive-heading-2'>
									{type === 'procedure'
										? `${t('procedures-selected')}`
										: `${t('applications-selected')}`}
									:
								</div>
								<div className='text-productive-heading-2'>{applications.length}</div>
							</div>
							<div className='pt-5'>
								<DatePicker datePickerType='single' allowInput minDate={date}>
									<DatePickerInput
										id='expiry-date'
										labelText={t('expiry-date')}
										placeholder='mm/dd/yyyy'
									/>
								</DatePicker>
								<TextArea labelText={t('description')} />
							</div>
						</Column>
					</ModalBody>
					<ModalFooter>
						<Button kind='secondary' onClick={() => setIsOpen(false)}>
							{t('cancel')}
						</Button>
						<Button>{t('send-email')}</Button>
					</ModalFooter>
				</ComposedModal>
			</Grid>
		</Form>
	);
};
export default MultipleReviewModal;
