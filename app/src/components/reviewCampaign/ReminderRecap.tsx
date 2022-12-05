/* eslint-disable no-nested-ternary */
import RevalidationReminderStore from '@store/user-revalidation/RevalidationReminderStore';
import { useRecoilValue } from 'recoil';
import { Accordion, AccordionItem } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import User from '@model/User';

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
			<div className='overflow-hidden'>
				<Accordion size='lg'>
					{[...refactoredData.keys()]
						.sort((a, b) => ((a.name ?? '') > (b.name ?? '') ? 1 : -1))
						.map(user => (
							<AccordionItem title={<div className='pl-5'>{user.displayName}</div>}>
								<div className='mb-3 pl-5 text-text-secondary'>{`${t(
									'userRevalidation:applications'
								)}: `}</div>
								{reminderData.applications &&
									reminderData.applications
										.filter(app => refactoredData.get(user)?.indexOf(app.id) !== -1)
										.map(a => <div className='pl-5'>{a.name}</div>)}
							</AccordionItem>
						))}
				</Accordion>
			</div>
		</div>
	);
};

export default ReminderRecap;
