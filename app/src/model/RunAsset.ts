import { RunAssetApi } from 'cosmo-api';
import Asset, { fromAssetApi } from './Asset';
import PathMonitoring from './PathMonitoring';

interface RunAsset {
	paths: PathMonitoring[];
	id: number;
	asset: Asset;
}
export const fromRunAssetApi = (runAssetApi: RunAssetApi): RunAsset => ({
	paths: [...runAssetApi.paths],
	id: runAssetApi.id,
	asset: fromAssetApi(runAssetApi.asset)
});
export default RunAsset;
