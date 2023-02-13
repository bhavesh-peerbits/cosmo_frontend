import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import MonitoringAsset, {
	toMonitoringAssetApi
} from '@model/ChangeMonitoring/MonitoringAsset';
import Instance, { toInstanceApi } from '@model/Narrative/Instance';

interface SaveDraftAssetParameters {
	monitoringId: string;
	monitoringAssets: MonitoringAsset[];
	instance: Instance;
}

const saveDraftAsset = ({
	monitoringId,
	monitoringAssets,
	instance
}: SaveDraftAssetParameters) => {
	return api.analystChangeMonitoringControllerApi.saveDraftAssets({
		monitoringId: +monitoringId,
		saveDraftAssetDto: {
			instance: toInstanceApi(instance),
			monitoringAssets: monitoringAssets.map(toMonitoringAssetApi)
		}
	});
};

const useSaveDraftAsset = () => {
	const queryClient = useQueryClient();
	return useMutation(saveDraftAsset, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring-draft', `${variables.monitoringId}`]);
			queryClient.invalidateQueries(['scripts', `${variables.monitoringId}`]);
		}
	});
};

export default useSaveDraftAsset;
