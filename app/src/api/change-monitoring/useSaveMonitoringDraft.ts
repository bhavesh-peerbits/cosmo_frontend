import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import MonitoringDraft, { toMonitoringDraftApi } from '@model/MonitoringDraft';

interface SaveMonitoringDraftParameters {
	draft: MonitoringDraft;
}

const saveMonitoringDraft = ({ draft }: SaveMonitoringDraftParameters) => {
	return api.analystChangeMonitoringControllerApi.saveDraft1({
		monitoringDraftDto: toMonitoringDraftApi(draft)
	});
};

const useSaveMonitoringDraft = () => {
	const queryClient = useQueryClient();
	return useMutation(saveMonitoringDraft, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring-draft', `${variables.draft.id}`]);
		}
	});
};

export default useSaveMonitoringDraft;
