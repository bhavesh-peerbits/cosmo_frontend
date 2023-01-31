import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromMonitoringApi } from '@model/Monitoring';

const useGetMonitoringById = (monitoringId: string) => {
	return api.analystChangeMonitoringControllerApi
		.getMonitoringById({ monitoringId: +monitoringId })
		.then(({ data }) => fromMonitoringApi(data));
};

export default (monitoringId: string) =>
	useQuery(['monitoring', monitoringId], () => useGetMonitoringById(monitoringId), {
		cacheTime: Infinity,
		staleTime: Infinity
	});
