import { SchedulingApi } from 'cosmo-api';
import { SchedulingDtoDayOfWeekEnum, SchedulingDtoFrequencyEnum } from 'cosmo-api/src/v1';

interface Scheduling {
	frequency: SchedulingDtoFrequencyEnum;
	startDate: Date;
	endDate?: Date;
	dayOfWeek?: SchedulingDtoDayOfWeekEnum[];
	dayOfMonth?: number;
	totalRuns?: number;
}

export const fromSchedulingApi = (schedulingApi: SchedulingApi): Scheduling => ({
	frequency: schedulingApi.frequency,
	startDate: new Date(schedulingApi.startDate),
	endDate: schedulingApi.endDate ? new Date(schedulingApi.endDate) : undefined,
	dayOfWeek: schedulingApi.dayOfWeek ? [...schedulingApi.dayOfWeek] : undefined,
	dayOfMonth: schedulingApi.dayOfMonth,
	totalRuns: schedulingApi.totalRun
});

export const toSchedulingApi = (scheduling: Scheduling): SchedulingApi => ({
	frequency: scheduling.frequency,
	startDate: scheduling.startDate.toISOString(),
	endDate: scheduling.endDate ? scheduling.endDate.toISOString() : undefined,
	dayOfWeek: scheduling.dayOfWeek ? [...scheduling.dayOfWeek] : undefined,
	dayOfMonth: scheduling.dayOfMonth,
	totalRun: scheduling.totalRuns
});

export default Scheduling;
