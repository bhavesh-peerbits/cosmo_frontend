import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromMonitoringApi } from '@model/Monitoring';

const useGetMonitoringDraftById = (draftId: string) => {
	return api.analystChangeMonitoringControllerApi
		.getDraft({ draftId: +draftId })
		.then(({ data }) => fromMonitoringApi(data));
};

export default (draftId: string) =>
	useQuery(['monitoring-draft', draftId], () => useGetMonitoringDraftById(draftId), {
		cacheTime: Infinity,
		staleTime: Infinity
	});
