import { SchedulingDtoDayOfWeekEnum, SchedulingDtoFrequencyEnum } from 'cosmo-api/src/v1';
import { useTranslation } from 'react-i18next';

export const TranslateFrequency = (frequency: SchedulingDtoFrequencyEnum) => {
	const { t } = useTranslation('changeMonitoring');
	switch (frequency) {
		case 'ANNUAL':
			return t('annual');
		case 'BE_WEEKLY':
			return t('biweekly');
		case 'WEEKLY':
			return t('weekly');
		case 'DAILY':
			return t('daily');
		case 'MONTHLY':
			return t('monthly');
		case 'ONDEMAND':
			return t('on-demand');
		case 'QUARTERLY':
			return t('quarterly');
		case 'SEMIANNUAL':
			return t('semiannual');
		default:
			return t('daily');
	}
};

export const TranslateDayOfWeek = (day: SchedulingDtoDayOfWeekEnum) => {
	const { t } = useTranslation('changeMonitoring');
	switch (day) {
		case 'MONDAY':
			return t('monday');
		case 'TUESDAY':
			return t('tuesday');
		case 'WEDNESDAY':
			return t('wednesday');
		case 'THURSDAY':
			return t('thursday');
		case 'FRIDAY':
			return t('friday');
		case 'SATURDAY':
			return t('saturday');
		default:
			return t('sunday');
	}
};
