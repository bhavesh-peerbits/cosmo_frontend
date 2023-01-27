import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteInstanceAssetParams {
	appId: string;
	instanceId: string;
	assetId: string;
}

const deleteInstanceAsset = ({
	appId,
	instanceId,
	assetId
}: DeleteInstanceAssetParams) => {
	return api.instanceAssetControllerApi.deleteAssetRelationship({
		appId: +appId,
		assetId: +assetId,
		instanceId: +instanceId
	});
};

const useDeleteInstanceAsset = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteInstanceAsset, {
		onSuccess: (_data, params) => {
			queryClient.invalidateQueries(['instances-asset', params.appId, params.instanceId]);
		}
	});
};

export default useDeleteInstanceAsset;
