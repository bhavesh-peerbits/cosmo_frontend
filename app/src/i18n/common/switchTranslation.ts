import {
	MonitoringDtoStatusEnum,
	RunDtoStatusEnum,
	SchedulingDtoDayOfWeekEnum,
	SchedulingDtoFrequencyEnum
} from 'cosmo-api/src/v1';
import { useTranslation } from 'react-i18next';

export const TranslateFrequency = (frequency: SchedulingDtoFrequencyEnum) => {
	const { t } = useTranslation('changeMonitoring');
	switch (frequency) {
		case 'ANNUAL':
			return t('annual');
		case 'BIWEEKLY':
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
			return 'Missing translation';
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

export const TranslateStatusRun = (status: RunDtoStatusEnum) => {
	const { t } = useTranslation('changeMonitoring');
	switch (status) {
		case 'COMPLETED':
			return t('completed');
		case 'PLANNED':
			return t('planned');
		case 'SETUP':
			return t('setup');
		case 'TERMINATED':
			return t('terminated');
		case 'UPLOAD':
			return t('upload');
		case 'WAITING_FOR_ANALYST':
			return t('waiting-analyst');
		case 'WAITING_FOR_FOCALPOINT':
			return t('waiting-focal-point');
		default:
			return 'Missing translation';
	}
};

export const TranslateStatusMonitoring = (status: MonitoringDtoStatusEnum) => {
	const { t } = useTranslation('changeMonitoring');
	switch (status) {
		case 'COMPLETED':
			return t('completed-monitoring');
		case 'DRAFT':
			return t('draft');
		case 'ONGOING':
			return t('ongoing');
		case 'TERMINATED':
			return t('terminated');
		case 'WAITING_FOR_ANALYST':
			return t('waiting-analyst');
		case 'WAITING_FOR_FOCALPOINT':
			return t('waiting-focal-point');
		default:
			return 'Missing translation';
	}
};
