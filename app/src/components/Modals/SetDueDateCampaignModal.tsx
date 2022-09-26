import {
	Button,
	ComposedModal,
	Form,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import ModalError from '@components/Modals/ModalError';
import ApiError from '@api/ApiError';
import useSetDueDateForCampaign from '@api/user-revalidation/useSetDueDateForCampaign';
import { useForm } from 'react-hook-form';
import { addDays, startOfTomorrow } from 'date-fns';
import DatePickerWrapper from '@components/DatePickerWrapper';

type FormData = {
	dueDate: Date;
};

type CloseModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	campaignId: string;
};

const SetDueDateCampaignModal = ({ isOpen, setIsOpen, campaignId }: CloseModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const { mutate, isError, error } = useSetDueDateForCampaign();
	const {
		control,
		handleSubmit,
		formState: { isValid }
	} = useForm<FormData>({
		mode: 'onChange',
		defaultValues: {
			dueDate: undefined
		}
	});
	const cleanUp = () => {
		setIsOpen(false);
	};

	const setDueDate = (data: FormData) => {
		return mutate(
			{
				campaignId,
				dueDate: data.dueDate
			},
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};

	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<Form onSubmit={handleSubmit(setDueDate)}>
				<ModalHeader title={t('userRevalidation:change-due-date')} closeModal={cleanUp}>
					{' '}
					<span className='text-text-secondary text-body-1'>
						{t('userRevalidation:select-new-date')}
					</span>
				</ModalHeader>
				<ModalBody>
					<DatePickerWrapper
						control={control}
						name='dueDate'
						label={`${t('userRevalidation:due-date')} *`}
						rules={{
							required: {
								value: true,
								message: `${t('modals:select-date')}`
							}
						}}
						minDate={addDays(startOfTomorrow(), 1)}
					/>
					<ModalError isError={isError} error={error as ApiError} />
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						{t('modals:cancel')}
					</Button>
					<Button disabled={!isValid} type='submit'>
						{t('modals:edit')}
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};
export default SetDueDateCampaignModal;
