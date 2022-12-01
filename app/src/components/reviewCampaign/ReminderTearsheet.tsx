/* eslint-disable no-nested-ternary */
import RevalidationReminderStore from '@store/user-revalidation/RevalidationReminderStore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Checkbox, Accordion, AccordionItem } from '@carbon/react';
import Tearsheet from '@components/Tearsheet';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import { useCallback, useEffect, useState } from 'react';
import User from '@model/User';

const ApplicationSelection = () => {
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
						'float-left flex w-full cursor-pointer border-b-[0.125rem] border-solid border-b-border-subtle-1',
						{
							'bg-layer-2': app.id === reminderData.middleApp?.id,
							'border-t-[0.125rem] border-solid border-t-border-subtle-1': index === 0
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
						className='flex h-8 max-w-[30px] place-content-center'
						id={app.id}
						onChange={(e, { checked }) => handleChecked(checked, app)}
						checked={shouldBeChecked(app.id)}
					/>
					<div
						className='flex h-8 w-full items-center text-body-compact-1 '
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

const UsersSelection = () => {
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
									'float-left flex w-full cursor-pointer border-b-[0.125rem] border-solid border-b-border-subtle-1',
									{
										'bg-layer-2': user.id === reminderData.middleApp?.id,
										'border-t-[0.125rem] border-solid border-t-border-subtle-1':
											index === 0
									}
								)}
							>
								<Checkbox
									labelText={user.displayName}
									className='m-1 ml-7  flex h-8 place-content-center'
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

const ReminderRecap = () => {
	const { t } = useTranslation(['userRevalidation']);
	const reminderData = useRecoilValue(RevalidationReminderStore);
	const [refactoredData, setRefactoredData] = useState<Map<User, string[]>>(new Map());

	useEffect(() => {
		const mapTmp = new Map<User, string[]>();
		reminderData.selected.forEach((value, key) => {
			value.forEach(u => {
				if ([...mapTmp.keys()].filter(us => us.id === u.id).length !== 0) {
					mapTmp.get([...mapTmp.keys()].filter(us => us.id === u.id)[0])?.push(key);
				} else {
					mapTmp.set(u, [key]);
				}
			});
		});
		setRefactoredData(mapTmp);
	}, [reminderData.selected, reminderData]);
	// TODO sort by name or surname ?
	return (
		<div>
			<div className='ml-7 mt-5 text-heading-3'>
				{t('userRevalidation:reminder-recap')}
			</div>
			<div className='ml-7 mt-1 mb-5 text-text-secondary'>
				{t('userRevalidation:recap-descrition')}
			</div>
			<Accordion size='md'>
				{[...refactoredData.keys()]
					.sort((a, b) => ((a.name ?? '') > (b.name ?? '') ? 1 : -1))
					.map(user => (
						<AccordionItem title={user.displayName}>
							{/* <ContainedList label='app'>
								{reminderData.applications &&
									reminderData.applications
										.filter(app => refactoredData.get(user)?.indexOf(app.id) !== -1)
										.map(a => (
											<ContainedListItem className='mt-2 ml-2'>
												{a.codeName}
											</ContainedListItem>
										))}
							</ContainedList> */}
						</AccordionItem>
					))}
			</Accordion>
		</div>
	);
};

const ReminderTearsheet = () => {
	const [reminderData, setReminderData] = useRecoilState(RevalidationReminderStore);
	const { t } = useTranslation(['userRevalidation', 'modals']);
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
					onClick: () => setReminderData(old => ({ ...old, open: false })),
					kind: 'primary' as const
				}
			]}
			size='extrawide'
			open={reminderData.open}
			influencer={ReminderRecap()}
			onClose={() => setReminderData(old => ({ ...old, open: false }))}
		>
			<div className='grid h-full grid-cols-2'>
				<div className='h-full border-r-[1px] border-solid border-r-background-active'>
					<ApplicationSelection />
				</div>
				<div>
					<UsersSelection />
				</div>
			</div>
		</Tearsheet>
	);
};

export default ReminderTearsheet;
