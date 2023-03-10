import {
	Button,
	Column,
	ComposedModal,
	Grid,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextInput,
	InlineLoading
} from '@carbon/react';
import DatePickerWrapper from '@components/DatePickerWrapper';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import User from '@model/common/User';
import { addDays, startOfTomorrow } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Campaign from '@model/UserRevalidation/Campaign';
import useSendCampaignRevalidationRequest from '@api/user-revalidation/useSendCampaignRevalidationRequest';
import ApiError from '@api/ApiError';
import useGetPossibleContributors from '@api/user-revalidation/useGetPossibleContributors';
import { useNavigate } from 'react-router-dom';

type SendCampaignModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	campaign: Campaign;
};

type FormData = {
	campaignName: string;
	dueDate: Date;
	collaborators: User[];
};

const SendCampaignModal = ({ isOpen, setIsOpen, campaign }: SendCampaignModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const navigate = useNavigate();
	const { mutate, isLoading, isError, error } = useSendCampaignRevalidationRequest();
	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<FormData>({
		mode: 'onChange',
		defaultValues: {
			campaignName: campaign.name,
			dueDate: undefined,
			collaborators: []
		}
	});

	const cleanUp = () => {
		setIsOpen(false);
		reset();
	};

	const sendRevalidation = (data: FormData) => {
		mutate(
			{
				campaignId: campaign.id,
				dueDate: data.dueDate,
				collaborators: data.collaborators.map(({ id }) => id)
			},
			{
				onSuccess: () => {
					cleanUp();
					navigate('/revalidations-ongoing');
				}
			}
		);
	};

	return (
		<ComposedModal
			preventCloseOnClickOutside
			open={isOpen}
			onClose={cleanUp}
			className='z-[9000]'
		>
			<ModalHeader title={t('userRevalidation:send-request')} closeModal={cleanUp} />
			<ModalBody hasForm>
				{t('userRevalidation:body-send', {
					action: `"${t('userRevalidation:send-revalidation')}"`
				})}
				<Grid className='mt-5'>
					<Column lg={8} md={4} sm={4} className='mb-5'>
						<TextInput
							id='campaign-name'
							labelText={`${t('userRevalidation:campaign-name')} *`}
							invalid={Boolean(errors.campaignName)}
							invalidText={errors.campaignName?.message}
							readOnly
							className='w-full grow-0'
							{...register('campaignName', {
								required: {
									value: true,
									message: `${t('userRevalidation:mandatory-name')}.`
								}
							})}
						/>
					</Column>
					<Column lg={8} md={4} sm={4} className='mb-5'>
						<MultipleUserSelect
							control={control}
							label={t('userRevalidation:collaborators')}
							name='collaborators'
							level={2}
							tooltipPosition='left'
							getUserFn={() => {
								// eslint-disable-next-line react-hooks/rules-of-hooks
								return useGetPossibleContributors(campaign.id);
							}}
						/>
					</Column>
					<FullWidthColumn className='mb-5'>
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
					</FullWidthColumn>

					<FullWidthColumn>
						{isError && (
							<InlineNotification
								kind='error'
								title='Error'
								hideCloseButton
								subtitle={
									(error as ApiError)?.message ||
									'An error has occurred, please try again later'
								}
							/>
						)}
					</FullWidthColumn>
				</Grid>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button onClick={handleSubmit(sendRevalidation)} disabled={!isValid || isLoading}>
					{t('userRevalidation:send-revalidation')}
					{isLoading ? <InlineLoading /> : ''}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default SendCampaignModal;
