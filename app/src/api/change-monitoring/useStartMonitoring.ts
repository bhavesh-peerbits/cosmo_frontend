import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import MonitoringDraft, { toMonitoringDraftApi } from '@model/MonitoringDraft';

interface StartMonitoringParams {
	draft: MonitoringDraft;
}

const startMonitoring = ({ draft }: StartMonitoringParams) => {
	return api.analystChangeMonitoringControllerApi.startMonitoring({
		monitoringDraftDto: toMonitoringDraftApi(draft)
	});
};

const useStartMonitoring = () => {
	const queryClient = useQueryClient();
	return useMutation(startMonitoring, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring-draft', `${variables.draft.id}`]);
		}
	});
};

export default useStartMonitoring;
