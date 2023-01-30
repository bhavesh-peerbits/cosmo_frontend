import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const closeCompletedRun = (runId: string) => {
	return api.analystChangeMonitoringControllerApi.closeCompletedRun1({ runId: +runId });
};

const useCloseCompletedRun = () => {
	const queryClient = useQueryClient();
	return useMutation(closeCompletedRun, {
		onSuccess: (data, runId) => {
			queryClient.invalidateQueries(['monitoring']);
			queryClient.removeQueries(['run-monitoring-inbox', runId]);
			queryClient.removeQueries(['monitoring-inbox']);
		}
	});
};

export default useCloseCompletedRun;
