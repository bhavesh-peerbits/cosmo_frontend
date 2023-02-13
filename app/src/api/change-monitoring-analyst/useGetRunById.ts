import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromRunApi } from '@model/ChangeMonitoring/Run';

const useGetRunById = (runId: string) => {
	return api.analystChangeMonitoringControllerApi
		.getRunById({ runId: +runId })
		.then(({ data }) => fromRunApi(data));
};

export default (runId: string) =>
	useQuery(['run-monitoring', runId], () => useGetRunById(runId), {
		cacheTime: Infinity,
		staleTime: Infinity
	});
