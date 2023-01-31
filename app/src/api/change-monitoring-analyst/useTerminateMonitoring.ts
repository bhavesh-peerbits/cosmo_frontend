import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SaveMonitoringDraftParameters {
	monitoringId: number;
}

const terminateMonitoring = ({ monitoringId }: SaveMonitoringDraftParameters) => {
	return api.analystChangeMonitoringControllerApi.closeMonitoring({
		monitoringId
	});
};

const useTerminateMonitoring = () => {
	const queryClient = useQueryClient();
	return useMutation(terminateMonitoring, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring', `${variables.monitoringId}`]);
		}
	});
};

export default useTerminateMonitoring;
