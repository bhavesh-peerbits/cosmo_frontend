import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteAssetGlobalParams {
	assetId: string;
}

const deleteAssetGlobal = ({ assetId }: DeleteAssetGlobalParams) => {
	return api.assetControllerApi.deleteAsset({
		assetId: +assetId
	});
};

const useDeleteAssetGlobal = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteAssetGlobal, {
		onSuccess: () => {
			queryClient.invalidateQueries(['all-assets']);
			queryClient.invalidateQueries(['instances-asset']);
		}
	});
};

export default useDeleteAssetGlobal;
