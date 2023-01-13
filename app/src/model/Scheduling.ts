import { SchedulingApi } from 'cosmo-api';
import { SchedulingDtoDayOfWeekEnum, FrequencyDto } from 'cosmo-api/src/v1';

interface Scheduling {
	frequency: FrequencyDto;
	startDate: Date;
	endDate: Date;
	dayOfWeek: SchedulingDtoDayOfWeekEnum[];
	dayOfMonth?: number;
	totalRuns?: number;
}

export const fromSchedulingApi = (schedulingApi: SchedulingApi): Scheduling => ({
	frequency: schedulingApi.frequency,
	startDate: new Date(schedulingApi.startDate),
	endDate: new Date(schedulingApi.endDate),
	dayOfWeek: [...schedulingApi.dayOfWeek],
	dayOfMonth: schedulingApi.dayOfMonth,
	totalRuns: schedulingApi.totalRun
});

export const toSchedulingApi = (scheduling: Scheduling): SchedulingApi => ({
	frequency: scheduling.frequency,
	startDate: scheduling.startDate.toISOString(),
	endDate: scheduling.endDate?.toISOString(),
	dayOfWeek: [...scheduling.dayOfWeek],
	dayOfMonth: scheduling.dayOfMonth,
	totalRun: scheduling.totalRuns
});

export default Scheduling;
