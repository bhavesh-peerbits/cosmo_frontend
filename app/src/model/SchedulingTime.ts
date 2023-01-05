import { SchedulingDtoTimeOffset } from 'cosmo-api/src/v1';

interface SchedulingTime {
	offset?: SchedulingDtoTimeOffset;
	hour?: number;
	minute?: number;
	second?: number;
	nano?: number;
}
export default SchedulingTime;
