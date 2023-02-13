import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromMonitoringDraftApi } from '@model/ChangeMonitoring/MonitoringDraft';

const useGetMonitoringDraftById = (draftId: string) => {
	return api.analystChangeMonitoringControllerApi
		.getDraft({ draftId: +draftId })
		.then(({ data }) => fromMonitoringDraftApi(data));
};

export default (draftId: string) =>
	useQuery(['monitoring-draft', draftId], () => useGetMonitoringDraftById(draftId), {
		cacheTime: Infinity,
		staleTime: Infinity
	});
