import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import MonitoringAsset, {
	toMonitoringAssetApi
} from '@model/ChangeMonitoring/MonitoringAsset';

interface SaveDraftPathParameters {
	monitoringAssets?: MonitoringAsset[];
}

const saveDraftPath = ({ monitoringAssets }: SaveDraftPathParameters) => {
	return api.analystChangeMonitoringControllerApi.saveDraftPath({
		saveDraftPathDto: { monitoringAssets: monitoringAssets?.map(toMonitoringAssetApi) }
	});
};

const useSaveDraftPath = () => {
	const queryClient = useQueryClient();
	return useMutation(saveDraftPath, {
		onSuccess: () => {
			queryClient.invalidateQueries(['monitoring-draft']);
		}
	});
};

export default useSaveDraftPath;
