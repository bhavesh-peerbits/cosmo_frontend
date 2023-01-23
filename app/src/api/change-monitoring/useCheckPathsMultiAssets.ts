import { useMutation } from '@tanstack/react-query';
import api from '@api';

interface CheckPathsMultiAssetParams {
	paths: string[];
	assetIds: string[];
}

const checkPathsMultiAsset = ({ paths, assetIds }: CheckPathsMultiAssetParams) => {
	return api.analystChangeMonitoringControllerApi
		.checkPathForMultipleAssets({
			checkPathAssetsDto: { paths, assetIds: assetIds.map(a => +a) }
		})
		.then(({ data }) => data);
};

const useCheckPathsMultiAsset = () => {
	return useMutation(checkPathsMultiAsset);
};

export default useCheckPathsMultiAsset;
