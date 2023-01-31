import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateAssetInstanceParams {
	appId: string;
	instanceId: string;
	assetId: string;
}

const createAssetInstance = ({
	appId,
	instanceId,
	assetId
}: CreateAssetInstanceParams) => {
	return api.instanceAssetControllerApi.createAssetRelationship({
		appId: +appId,
		assetId: +assetId,
		instanceId: +instanceId
	});
};

const useCreateAssetInstance = () => {
	const queryClient = useQueryClient();
	return useMutation(createAssetInstance, {
		onSuccess: (_data, params) => {
			queryClient.invalidateQueries(['instances-asset', params.appId, params.instanceId]);
		}
	});
};

export default useCreateAssetInstance;
