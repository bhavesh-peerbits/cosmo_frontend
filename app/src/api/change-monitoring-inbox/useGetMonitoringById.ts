import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromMonitoringApi } from '@model/ChangeMonitoring/Monitoring';

const useGetMonitoringById = (monitoringId: string) => {
	return api.focalPointChangeMonitoringControllerApi
		.getMonitoring({ monitoringId: +monitoringId })
		.then(({ data }) => fromMonitoringApi(data));
};

export default (monitoringId: string) =>
	useQuery(['monitoring-inbox', monitoringId], () => useGetMonitoringById(monitoringId), {
		cacheTime: Infinity,
		staleTime: Infinity
	});
