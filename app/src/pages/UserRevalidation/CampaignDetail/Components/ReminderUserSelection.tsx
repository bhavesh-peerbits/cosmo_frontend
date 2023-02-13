/* eslint-disable no-nested-ternary */
import RevalidationReminderStore from '@store/user-revalidation/RevalidationReminderStore';
import { useRecoilState } from 'recoil';
import { Checkbox } from '@carbon/react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import User from '@model/common/User';

const ReminderUserSelection = () => {
	const [reminderData, setReminderData] = useRecoilState(RevalidationReminderStore);
	const { t } = useTranslation(['userRevalidation']);
	const shouldBeChecked = useCallback(
		(user: User): boolean => {
			return [...reminderData.selected.keys()].indexOf(
				reminderData.middleApp?.id ?? ''
			) !== -1
				? reminderData.selected.get(reminderData.middleApp?.id ?? '')?.indexOf(user) !==
						-1
				: false;
		},
		[reminderData.selected, reminderData.middleApp]
	);

	const handleChange = (checked: boolean, user: User) => {
		if (checked) {
			[...reminderData.selected.keys()].indexOf(reminderData.middleApp?.id ?? '') === -1
				? setReminderData(old => ({
						...old,
						selected: reminderData.selected.set(reminderData.middleApp?.id ?? '', [user])
				  }))
				: reminderData.selected.get(reminderData.middleApp?.id ?? '')?.push(user) &&
				  setReminderData(old => ({
						...old,
						selected: reminderData.selected
				  }));
		} else {
			const usersTmp = reminderData.selected
				.get(reminderData.middleApp?.id ?? '')
				?.filter(us => us.id !== user.id);
			reminderData.selected.delete(reminderData.middleApp?.id ?? '');
			if (usersTmp && usersTmp.length !== 0) {
				setReminderData(old => ({
					...old,
					selected: reminderData.selected.set(
						reminderData.middleApp?.id ?? '',
						usersTmp ?? []
					)
				}));
			} else {
				setReminderData(old => ({
					...old,
					selected: reminderData.selected
				}));
			}
		}
	};

	return (
		<>
			<div
				className='mt-5 ml-7 overflow-hidden line-clamp-1 text-heading-3'
				title={reminderData.middleApp?.name}
			>
				{`${t('userRevalidation:users-for-application')}: ${
					reminderData.middleApp ? reminderData.middleApp.name : ''
				}`}
			</div>
			<div className='ml-7 mt-1 mb-5 text-text-secondary'>
				{t('userRevalidation:select-user-descrition')}
			</div>
			<div>
				{reminderData.middleApp &&
					reminderData.userApp
						.get(reminderData.middleApp.id)
						?.users?.map((user, index) => (
							<div
								className={cx(
									'float-left flex w-full cursor-pointer border-b-[1px] border-solid border-b-border-subtle-1',
									{
										'bg-layer-2': user.id === reminderData.middleApp?.id,
										'border-t-[1px] border-solid border-t-border-subtle-1': index === 0
									}
								)}
							>
								<Checkbox
									labelText={user.displayName}
									className='m-1 ml-7  flex h-[44px] place-content-center'
									id={`user-${user.id}-${
										reminderData.middleApp &&
										reminderData.userApp.get(reminderData.middleApp.id)?.appId
									}`}
									key={`user-${user.id}-${
										reminderData.middleApp &&
										reminderData.userApp.get(reminderData.middleApp.id)?.appId
									}`}
									checked={shouldBeChecked(user)}
									onChange={(e, { checked }) => handleChange(checked, user)}
								/>
							</div>
						))}
			</div>
		</>
	);
};

export default ReminderUserSelection;
