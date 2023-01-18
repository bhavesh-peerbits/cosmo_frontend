import Scheduling from '@model/Scheduling';
import { useTranslation } from 'react-i18next';

const GetSchedulingDisplayInfo = (scheduling: Scheduling) => {
	const { t } = useTranslation('changeMonitoring');
	switch (scheduling.frequency) {
		case 'ONDEMAND':
			return t('info-ondemand-scheduling');
		case 'DAILY':
			return t('info-daily-scheduling');
		case 'WEEKLY':
			return t('info-weekly-scheduling', {
				day: scheduling.dayOfWeek?.[0] && t(scheduling.dayOfWeek[0])
			});
		case 'BIWEEKLY':
			return t('info-weekly-scheduling', {
				day1: scheduling.dayOfWeek?.[0] && t(scheduling.dayOfWeek[0]),
				day2: scheduling.dayOfWeek?.[1] && t(scheduling.dayOfWeek[1])
			});
		case 'MONTHLY':
			return t('info-monthly-scheduling', {
				day: scheduling.dayOfMonth
			});
		case 'QUARTERLY':
			return t('info-quarterly-semiannual-scheduling', { numberOfMonths: 3 });
		case 'SEMIANNUAL':
			return t('info-quarterly-semiannual-scheduling', { numberOfMonths: 6 });
		case 'ANNUAL':
			return t('info-annual-scheduling');
		default:
			return '';
	}
};

export default GetSchedulingDisplayInfo;
