import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CloseCompletedRunInboxParams {
	runId: string;
}
const closeCompletedInboxRun = ({ runId }: CloseCompletedRunInboxParams) => {
	return api.focalPointChangeMonitoringControllerApi.closeCompletedRun({
		runId: +runId
	});
};

const useCloseCompletedRunInbox = () => {
	const queryClient = useQueryClient();
	return useMutation(closeCompletedInboxRun, {
		onSuccess: (data, runId) => {
			queryClient.invalidateQueries(['monitoring']);
			queryClient.invalidateQueries(['run-monitoring-inbox', runId]);
			queryClient.invalidateQueries(['monitoring-inbox']);
		}
	});
};

export default useCloseCompletedRunInbox;
