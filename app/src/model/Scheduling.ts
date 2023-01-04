import { SchedulingApi } from 'cosmo-api';
import { SchedulingDtoDayOfWeekEnum, SchedulingDtoFrequencyEnum } from 'cosmo-api/src/v1';
import SchedulingTime from './SchedulingTime';

interface Scheduling {
	frequency: SchedulingDtoFrequencyEnum;
	startDate: Date;
	endDate?: Date;
	time?: SchedulingTime;
	dayOfWeek?: SchedulingDtoDayOfWeekEnum[];
	dayOfMonth?: number;
}

export const fromSchedulingApi = (schedulingApi: SchedulingApi): Scheduling => ({
	frequency: schedulingApi.frequency,
	startDate: new Date(schedulingApi.startDate),
	endDate: schedulingApi.endDate ? new Date(schedulingApi.endDate) : undefined,
	time: schedulingApi.time,
	dayOfWeek: schedulingApi.dayOfWeek ? [...schedulingApi.dayOfWeek] : undefined,
	dayOfMonth: schedulingApi.dayOfMonth
});
export default Scheduling;
