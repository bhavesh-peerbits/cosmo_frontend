import { Form } from '@carbon/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import User from '@model/User';
import SingleUserSelect from '@components/SingleUserSelect';
import MultipleUserSelect from '@components/MultipleUserSelect';
import DatePickerWrapper from '@components/DatePickerWrapper';
import { startOfTomorrow } from 'date-fns';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';

type SendToFocalPointProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string>>;
};

type SendFocalPointFormData = {
	focalPoint: User;
	delegates: User[];
	dueDate: Date;
};

const SendToFocalPointModal = ({ isOpen, setIsOpen }: SendToFocalPointProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['modals', 'runDetails', 'evidenceRequest']);
	const { monitoringId = '' } = useParams();

	const cleanUp = () => {
		setIsOpen('');
	};

	const {
		control,
		formState: { isValid }
	} = useForm<SendFocalPointFormData>();
	// TODO Fix number in modal body

	return (
		<TearsheetNarrow
			hasCloseIcon
			label='Monitoring Name - Run 5'
			description={t('runDetails:helper-focal-point')}
			title={t('runDetails:complete-run')}
			open={isOpen}
			onClose={cleanUp}
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-send-focal-point'
				},
				{
					label: t('runDetails:send-request'),
					id: 'send-focal-point',
					disabled: !isValid,
					onClick: () => navigate(`/monitoring-dashboard/${monitoringId}`)
				}
			]}
		>
			<Form className='space-y-5 px-5'>
				{/* // TODO Add default values */}
				<SingleUserSelect
					level={2}
					label='Focal Point *'
					name='focalPoint'
					rules={{
						required: {
							value: true,
							message: 'A owner is required'
						}
					}}
					control={control}
					tooltipPosition='left'
				/>
				<MultipleUserSelect
					level={2}
					label={`${t('evidenceRequest:focal-point-delegates')} *`}
					name='delegates'
					rules={{
						required: {
							value: true,
							message: t('modals:field-required')
						}
					}}
					control={control}
					tooltipPosition='left'
				/>
				<DatePickerWrapper
					control={control}
					name='dueDate'
					label={`${t('evidenceRequest:due-date')} *`}
					rules={{
						required: {
							value: true,
							message: `${t('modals:select-date')}`
						}
					}}
					minDate={startOfTomorrow()}
				/>
				{/* {isError && (
					<div className='mt-5 flex items-center justify-center'>
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
				)} */}
			</Form>
		</TearsheetNarrow>
	);
};
export default SendToFocalPointModal;
