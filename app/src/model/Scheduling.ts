import { SchedulingApi } from 'cosmo-api';
import { SchedulingDtoDayOfWeekEnum, FrequencyDto } from 'cosmo-api/src/v1';
import SchedulingTime from './SchedulingTime';

interface Scheduling {
	frequency: FrequencyDto;
	startDate: Date;
	endDate?: Date;
	time?: SchedulingTime;
	dayOfWeek?: SchedulingDtoDayOfWeekEnum[];
	dayOfMonth?: number;
	totalRuns?: number;
}

export const fromSchedulingApi = (schedulingApi: SchedulingApi): Scheduling => ({
	frequency: schedulingApi.frequency,
	startDate: new Date(schedulingApi.startDate),
	endDate: schedulingApi.endDate ? new Date(schedulingApi.endDate) : undefined,
	time: schedulingApi.time,
	dayOfWeek: schedulingApi.dayOfWeek ? [...schedulingApi.dayOfWeek] : undefined,
	dayOfMonth: schedulingApi.dayOfMonth,
	totalRuns: schedulingApi.totalRun
});
export default Scheduling;
