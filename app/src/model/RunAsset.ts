import { RunAssetApi } from 'cosmo-api';
import { PathMonitoringDto } from 'cosmo-api/src/v1';
import Asset, { fromAssetApi } from './Asset';

interface RunAsset {
	paths: PathMonitoringDto[];
	id: number;
	asset: Asset;
}
export const fromRunAssetApi = (runAssetApi: RunAssetApi): RunAsset => ({
	paths: [...runAssetApi.paths],
	id: runAssetApi.id,
	asset: fromAssetApi(runAssetApi.asset)
});
export default RunAsset;
