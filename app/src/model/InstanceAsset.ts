import { InstanceAssetApi } from 'cosmo-api';
import Asset, { fromAssetApi } from './Narrative/Asset';
import Instance, { fromInstanceApi } from './Instance';

interface InstanceAsset {
	instance?: Instance;
	assets?: Asset[];
}

export const fromInstanceAssetApi = (
	instanceAssetApi: InstanceAssetApi
): InstanceAsset => ({
	instance: instanceAssetApi.instance
		? fromInstanceApi(instanceAssetApi.instance)
		: undefined,
	assets: instanceAssetApi.assets
		? [...instanceAssetApi.assets.values()].map(fromAssetApi)
		: undefined
});

export default InstanceAsset;
