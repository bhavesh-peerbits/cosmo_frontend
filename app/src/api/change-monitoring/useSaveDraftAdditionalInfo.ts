import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import MonitoringAsset, { toMonitoringAssetApi } from '@model/MonitoringAsset';

interface SaveDraftAdditionalInfoParameters {
	monitoringId: string;
	monitoringAssets?: MonitoringAsset[];
	note: string;
}

const saveDraftAdditionalInfo = ({
	monitoringId,
	monitoringAssets,
	note
}: SaveDraftAdditionalInfoParameters) => {
	return api.analystChangeMonitoringControllerApi.saveDraftAdditionalInfo({
		monitoringId: +monitoringId,
		saveDraftAdditionalInfoDto: {
			monitoringAssets: monitoringAssets?.map(toMonitoringAssetApi),
			note
		}
	});
};

const useSaveDraftAdditionalInfo = () => {
	const queryClient = useQueryClient();
	return useMutation(saveDraftAdditionalInfo, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring-draft', `${variables.monitoringId}`]);
		}
	});
};

export default useSaveDraftAdditionalInfo;
