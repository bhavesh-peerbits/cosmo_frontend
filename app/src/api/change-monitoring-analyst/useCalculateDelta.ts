import api from '@api';
import { fromRunApi } from '@model/ChangeMonitoring/Run';
import { useQueryClient, useMutation } from '@tanstack/react-query';

interface CalculateDeltaParameter {
	runId: string;
}
const useCalculateDelta = ({ runId }: CalculateDeltaParameter) => {
	return api.analystChangeMonitoringControllerApi
		.calculateDelta({ runId: +runId })
		.then(({ data }) => fromRunApi(data));
};

export default () => {
	const queryClient = useQueryClient();
	return useMutation(useCalculateDelta, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring-inbox', variables.runId]);
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};
