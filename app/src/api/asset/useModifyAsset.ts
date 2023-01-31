import api from '@api';
import Asset, { fromAssetApi, toAssetApi } from '@model/Asset';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ModifyAssetParams {
	assetId: string;
	asset: Asset;
}

const modifyAsset = ({ assetId, asset }: ModifyAssetParams) => {
	return api.assetControllerApi
		.modifyAsset({
			assetId: +assetId,
			assetDto: toAssetApi(asset)
		})
		.then(({ data }) => fromAssetApi(data));
};

const useModifyAsset = () => {
	const queryClient = useQueryClient();
	return useMutation(modifyAsset, {
		onSuccess: () => {
			queryClient.invalidateQueries(['all-assets']);
			queryClient.invalidateQueries(['instances-asset']);
		}
	});
};

export default useModifyAsset;
