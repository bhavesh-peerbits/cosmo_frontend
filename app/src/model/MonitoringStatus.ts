import { MonitoringDtoStatusApi, MonitoringDtoStatusApiEnum } from 'cosmo-api/src';

export type MonitoringStatus = MonitoringDtoStatusApi;

export const mapMonitoringStatusToMonitoringDisplayStatus = (
	monitoringStatus: MonitoringDtoStatusApi
) => {
	switch (monitoringStatus) {
		case MonitoringDtoStatusApiEnum.Completed:
			return 'Completed';
		case MonitoringDtoStatusApiEnum.Draft:
			return 'Draft';
		case MonitoringDtoStatusApiEnum.Ongoing:
			return 'Ongoing';
		case MonitoringDtoStatusApiEnum.Pending:
			return 'Pending';
		default:
			return '';
	}
};
