import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import RunAsset, { toRunAssetApi } from '@model/ChangeMonitoring/RunAsset';

interface AddPathToAnAssetRunParameters {
	runAssets: RunAsset[];
}

const addPathToAnAssetRun = ({ runAssets }: AddPathToAnAssetRunParameters) => {
	return api.analystChangeMonitoringControllerApi.saveRunAsset({
		runAssetDto: runAssets.map(toRunAssetApi)
	});
};

const useAddPathToAnAssetRun = () => {
	const queryClient = useQueryClient();
	return useMutation(addPathToAnAssetRun, {
		onSuccess: () => {
			queryClient.invalidateQueries(['run-monitoring']);
		}
	});
};

export default useAddPathToAnAssetRun;
