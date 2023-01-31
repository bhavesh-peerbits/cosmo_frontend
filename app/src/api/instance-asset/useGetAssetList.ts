import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromAssetApi } from '@model/Asset';

interface GetAssetListParams {
	appId: string;
	instanceId: string;
}
const useGetAssetList = ({ instanceId, appId }: GetAssetListParams) => {
	return api.instanceAssetControllerApi
		.getAssetList({ instanceId: +instanceId, appId: +appId })
		.then(({ data }) => (data ? data.map(fromAssetApi) : []));
};

export default ({ appId, instanceId }: GetAssetListParams) =>
	useQuery(['instances-asset', appId, instanceId], () =>
		useGetAssetList({ instanceId, appId })
	);
