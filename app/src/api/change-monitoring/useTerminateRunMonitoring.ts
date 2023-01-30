import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SaveMonitoringDraftParameters {
	runId: number;
}

const terminateRunMonitoring = ({ runId }: SaveMonitoringDraftParameters) => {
	return api.analystChangeMonitoringControllerApi.closeRun({
		runId
	});
};

const useTerminateRunMonitoring = () => {
	const queryClient = useQueryClient();
	return useMutation(terminateRunMonitoring, {
		onSuccess: () => {
			queryClient.invalidateQueries(['run-monitoring']);
		}
	});
};

export default useTerminateRunMonitoring;
