import { SchedulingDtoDayOfWeekEnum, SchedulingDtoFrequencyEnum } from 'cosmo-api/src/v1';
import SchedulingTime from './SchedulingTime';

interface Scheduling {
	frequency: SchedulingDtoFrequencyEnum;
	startDate: string;
	endDate?: string;
	time?: SchedulingTime;
	dayOfWeek?: SchedulingDtoDayOfWeekEnum[];
	dayOfMonth?: number;
}
export default Scheduling;
