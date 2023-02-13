import api from '@api';
import Scheduling, { toSchedulingApi } from '@model/ChangeMonitoring/Scheduling';
import { useQuery } from '@tanstack/react-query';

const useGetTotalRun = (scheduling?: Scheduling) => {
	return scheduling
		? api.schedulingControllerApi
				.getTotalRun({
					schedulingDto: toSchedulingApi(scheduling)
				})
				.then(({ data }) => data)
		: null;
};

export default (scheduling?: Scheduling) =>
	useQuery(['total-runs', scheduling], () => useGetTotalRun(scheduling));
