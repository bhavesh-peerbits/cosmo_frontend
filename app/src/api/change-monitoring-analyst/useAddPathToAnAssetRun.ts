import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface AddPathToAnAssetRunParameters {
	path: string;
	runId: string;
	assetId: string;
}

const addPathToAnAssetRun = ({ path, runId, assetId }: AddPathToAnAssetRunParameters) => {
	return api.analystChangeMonitoringControllerApi.addPathRun({
		assetId: +assetId,
		body: path,
		runId: +runId
	});
};

const useAddPathToAnAssetRun = () => {
	const queryClient = useQueryClient();
	return useMutation(addPathToAnAssetRun, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};

export default useAddPathToAnAssetRun;
