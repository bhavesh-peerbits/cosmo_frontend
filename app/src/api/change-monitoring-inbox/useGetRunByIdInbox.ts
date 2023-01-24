import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromRunApi } from '@model/Run';

const useGetRunByIdInbox = (runId: string) => {
	return api.focalPointChangeMonitoringControllerApi
		.getRun({ runId: +runId })
		.then(({ data }) => fromRunApi(data));
};

export default (runId: string) =>
	useQuery(['run-monitoring-inbox', runId], () => useGetRunByIdInbox(runId), {
		cacheTime: Infinity,
		staleTime: Infinity
	});
