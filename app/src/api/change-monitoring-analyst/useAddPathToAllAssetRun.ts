import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface AddPathToAllAssetRunParameters {
	path: string;
	runId: string;
}

const addPathToAllAssetRun = ({ path, runId }: AddPathToAllAssetRunParameters) => {
	return api.analystChangeMonitoringControllerApi.addPathsRun({
		body: path,
		runId: +runId
	});
};

const useAddPathToAllAssetRun = () => {
	const queryClient = useQueryClient();
	return useMutation(addPathToAllAssetRun, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};

export default useAddPathToAllAssetRun;
