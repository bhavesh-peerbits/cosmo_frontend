import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Scheduling, { toSchedulingApi } from '@model/ChangeMonitoring/Scheduling';

interface SaveDraftSchedulingParameters {
	monitoringId: string;
	scheduling: Scheduling;
}

const saveDraftScheduling = ({
	monitoringId,
	scheduling
}: SaveDraftSchedulingParameters) => {
	return api.analystChangeMonitoringControllerApi.saveDraftScheduling({
		monitoringId: +monitoringId,
		saveDraftSchedulingDto: {
			scheduling: toSchedulingApi(scheduling)
		}
	});
};

const useSaveDraftScheduling = () => {
	const queryClient = useQueryClient();
	return useMutation(saveDraftScheduling, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring-draft', `${variables.monitoringId}`]);
		}
	});
};

export default useSaveDraftScheduling;
