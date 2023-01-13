import { useMutation } from '@tanstack/react-query';
import api from '@api';

interface CheckPathsMultiAssetParams {
	path: string;
	assetIds: string[];
}

const checkPathsMultiAsset = ({ path, assetIds }: CheckPathsMultiAssetParams) => {
	return api.analystChangeMonitoringControllerApi
		.checkPathForMultipleAssets({
			checkPathAssetsDto: { path, assetIds: assetIds.map(a => +a) }
		})
		.then(({ data }) => data);
};

const useCheckPathsMultiAsset = () => {
	return useMutation(checkPathsMultiAsset);
};

export default useCheckPathsMultiAsset;
