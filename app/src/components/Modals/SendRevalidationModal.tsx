import {
	Button,
	Column,
	ComposedModal,
	Grid,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextInput
} from '@carbon/react';
import DatePickerWrapper from '@components/DatePickerWrapper';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import User from '@model/User';
import { startOfTomorrow } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type DeleteModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

type FormData = {
	campaignName: string;
	dueDate: Date;
	collaborators: User[];
	description?: string;
};

const SendCampaignModal = ({ isOpen, setIsOpen }: DeleteModalProps) => {
	const { t } = useTranslation('modals');
	const { t: tUser } = useTranslation('userRevalidation');
	const { t: tReview } = useTranslation('reviewNarrative');
	const {
		control,
		register,
		reset,
		formState: { isValid, errors }
	} = useForm<FormData>({
		mode: 'onChange'
	});

	const cleanUp = () => {
		setIsOpen(false);
		reset();
	};

	return (
		<ComposedModal preventCloseOnClickOutside open={isOpen} onClose={cleanUp}>
			<ModalHeader title={tUser('send-request')} closeModal={cleanUp} />
			<ModalBody hasForm>
				{t('body-add', { action: `"${tUser('send-revalidation')}".` })}
				<Grid className='mt-5'>
					<Column lg={8} md={4} sm={4} className='mb-5'>
						<TextInput
							id='campaign-name'
							labelText={`${tUser('campaign-name')} *`}
							invalid={Boolean(errors.campaignName)}
							invalidText={errors.campaignName?.message}
							className='w-full grow-0'
							{...register('campaignName', {
								required: {
									value: true,
									message: `${tUser('mandatory-name')}.`
								}
							})}
							// TODO fix campaign name as default value
						/>
					</Column>
					<Column lg={8} md={4} sm={4} className='mb-5'>
						<MultipleUserSelect
							control={control}
							label={tUser('collaborators')}
							name='collaborators'
							level={2}
							tooltipPosition='left'
						/>
					</Column>
					<FullWidthColumn className='mb-5'>
						<DatePickerWrapper
							control={control}
							name='dueDate'
							label={`${tReview('due-date')} *`}
							rules={{
								required: {
									value: true,
									message: `${t('select-date')}`
								}
							}}
							minDate={startOfTomorrow()}
						/>
					</FullWidthColumn>
				</Grid>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('cancel')}
				</Button>
				<Button disabled={!isValid}>{tUser('send-revalidation')}</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default SendCampaignModal;
