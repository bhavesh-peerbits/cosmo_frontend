import api from '@api';
import Asset, { toAssetApi } from '@model/Narrative/Asset';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateAssetParams {
	appId: string;
	instanceId: string;
	asset: Asset;
}

const createAsset = ({ appId, instanceId, asset }: CreateAssetParams) => {
	return api.instanceAssetControllerApi.createAsset({
		appId: +appId,
		instanceId: +instanceId,
		assetDto: toAssetApi(asset)
	});
};

const useCreateAsset = () => {
	const queryClient = useQueryClient();
	return useMutation(createAsset, {
		onSuccess: (_data, params) => {
			queryClient.invalidateQueries(['instances-asset', params.appId, params.instanceId]);
		}
	});
};

export default useCreateAsset;
