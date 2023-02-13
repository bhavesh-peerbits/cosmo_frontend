import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import MonitoringDraft, {
	toMonitoringDraftApi
} from '@model/ChangeMonitoring/MonitoringDraft';

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
			queryClient.removeQueries(['monitoring-draft', `${variables.draft.id}`]);
			queryClient.invalidateQueries(['all-monitoring-drafts']);
			queryClient.invalidateQueries(['all-monitoring']);
		}
	});
};

export default useStartMonitoring;
