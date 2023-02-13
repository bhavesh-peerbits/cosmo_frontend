import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromAssetApi } from '@model/Narrative/Asset';

const useGetAllAssetsTenant = () => {
	return api.assetControllerApi
		.getTenantAssets()
		.then(({ data }) => (data ? data.map(fromAssetApi) : []));
};

export default () => useQuery(['all-assets'], () => useGetAllAssetsTenant());
