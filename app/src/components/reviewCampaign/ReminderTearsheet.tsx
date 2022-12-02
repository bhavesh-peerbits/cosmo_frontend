/* eslint-disable no-nested-ternary */
import RevalidationReminderStore from '@store/user-revalidation/RevalidationReminderStore';
import { useRecoilState } from 'recoil';
import Tearsheet from '@components/Tearsheet';
import { useTranslation } from 'react-i18next';
import useSendRevReminder from '@api/user-revalidation/useSendRevReminder';
import ReminderApplicationSelection from './ReminderApplicationSelection';
import ReminderUserSelection from './ReminderUserSelection';
import ReminderRecap from './ReminderRecap';

const ReminderTearsheet = () => {
	const [reminderData, setReminderData] = useRecoilState(RevalidationReminderStore);
	const { t } = useTranslation(['userRevalidation', 'modals']);
	const { mutate, isLoading } = useSendRevReminder();

	const handleSubmit = () => {
		const sendTo: string[] = [];
		reminderData.selected.forEach(users =>
			users.forEach(
				user => !sendTo.filter(u => u === user.id).length && sendTo.push(user.id)
			)
		);
		mutate(
			{ ids: sendTo },
			{
				onSuccess: () =>
					setReminderData(old => ({
						...old,
						open: false,
						selected: new Map()
					}))
			}
		);
	};

	return (
		<Tearsheet
			influencerPosition='right'
			influencerWidth='extrawide'
			hasCloseIcon
			title='Reminder Users Selection'
			actions={[
				{
					id: 'cancel-button',
					label: t('modals:cancel'),
					onClick: () => setReminderData(old => ({ ...old, open: false })),
					kind: 'secondary' as const
				},
				{
					id: 'submit-button',
					label: t('modals:send-email'),
					onClick: handleSubmit,
					disabled: isLoading,
					kind: 'primary' as const
				}
			]}
			size='extrawide'
			open={reminderData.open}
			influencer={<ReminderRecap />}
			onClose={() => setReminderData(old => ({ ...old, open: false }))}
		>
			<div className='grid h-full grid-cols-2'>
				<div className='h-full border-r-[1px] border-solid border-r-background-active'>
					<ReminderApplicationSelection />
				</div>
				<div>
					<ReminderUserSelection />
				</div>
			</div>
		</Tearsheet>
	);
};

export default ReminderTearsheet;
