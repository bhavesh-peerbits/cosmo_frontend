import Scheduling from '@model/Scheduling';
import { useTranslation } from 'react-i18next';
import { TranslateDayOfWeek } from './switchTranslation';

const GetSchedulingDisplayInfo = (scheduling: Scheduling) => {
	const { t } = useTranslation(['changeMonitoring']);
	switch (scheduling.frequency) {
		case 'ONDEMAND':
			return t('changeMonitoring:info-ondemand-scheduling');
		case 'DAILY':
			return t('changeMonitoring:info-daily-scheduling');
		case 'WEEKLY':
			return t('changeMonitoring:info-weekly-scheduling', {
				day:
					scheduling.dayOfWeek?.[0] &&
					TranslateDayOfWeek(scheduling.dayOfWeek?.[0]).toLowerCase()
			});
		case 'BIWEEKLY':
			return t('changeMonitoring:info-weekly-scheduling', {
				day1:
					scheduling.dayOfWeek?.[0] &&
					TranslateDayOfWeek(scheduling.dayOfWeek?.[0]).toLowerCase(),
				day2:
					scheduling.dayOfWeek?.[1] &&
					TranslateDayOfWeek(scheduling.dayOfWeek?.[1]).toLowerCase()
			});
		case 'MONTHLY':
			return t('changeMonitoring:info-monthly-scheduling', {
				day: scheduling.dayOfMonth
			});
		case 'QUARTERLY':
			return t('changeMonitoring:info-quarterly-semiannual-scheduling');
		case 'SEMIANNUAL':
			return t('changeMonitoring:info-quarterly-semiannual-scheduling');
		case 'ANNUAL':
			return t('changeMonitoring:info-annual-scheduling');
		default:
			return '';
	}
};

export default GetSchedulingDisplayInfo;
