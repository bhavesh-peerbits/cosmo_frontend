import Application from '@model/Narrative/Application';
import RevalidationReminderStore from '@store/user-revalidation/RevalidationReminderStore';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import cx from 'classnames';
import { Checkbox } from '@carbon/react';

const ReminderApplicationSelection = () => {
	const [reminderData, setReminderData] = useRecoilState(RevalidationReminderStore);
	const { t } = useTranslation(['userRevalidation']);
	const handleClick = (app: Application) => {
		setReminderData(old => ({ ...old, middleApp: app }));
	};

	const handleChecked = (checked: boolean, app: Application) => {
		checked
			? setReminderData(old => ({
					...old,
					selected: old.selected.set(
						app.id,
						reminderData.userApp.get(app.id)?.users ?? []
					)
			  }))
			: reminderData.selected.delete(app.id) &&
			  setReminderData(old => ({ ...old, selected: reminderData.selected }));
	};

	const shouldBeChecked = (appId: string): boolean => {
		return [...reminderData.selected.keys()].indexOf(appId) !== -1;
	};
	return (
		<div>
			<div className='ml-7 mt-5 text-heading-3'>{t('userRevalidation:applications')}</div>
			<div className='ml-7 mt-1 mb-5 text-text-secondary'>
				{t('userRevalidation:select-app-descrition')}
			</div>
			{reminderData.applications?.map((app, index) => (
				<div
					className={cx(
						'float-left flex w-full cursor-pointer border-b-[1px] border-solid border-b-border-subtle-1',
						{
							'bg-layer-2': app.id === reminderData.middleApp?.id,
							'border-t-[1px] border-solid border-t-border-subtle-1': index === 0
						}
					)}
				>
					<div
						className='w-[32px]'
						onClick={() => handleClick(app)}
						onKeyDown={() => handleClick(app)}
						role='menuitem'
						tabIndex={-1}
					>
						{' '}
					</div>

					<Checkbox
						labelText=''
						className='flex h-[44px] max-w-[30px] place-content-center'
						id={app.id}
						onChange={(e, { checked }) => handleChecked(checked, app)}
						checked={shouldBeChecked(app.id)}
					/>
					<div
						className='flex h-[44px] w-full items-center text-body-compact-1 '
						onClick={() => handleClick(app)}
						onKeyDown={() => handleClick(app)}
						role='menuitem'
						tabIndex={-1}
					>
						{app.name}
					</div>
				</div>
			))}
		</div>
	);
};

export default ReminderApplicationSelection;
