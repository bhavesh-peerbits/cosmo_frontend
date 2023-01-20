import { RunAssetApi } from 'cosmo-api';
import { PathMonitoringDto } from 'cosmo-api/src/v1';
import Asset, { fromAssetApi } from './Asset';
import RunFileLink, { fromRunFileLinkApi } from './RunFileLink';

interface RunAsset {
	paths: PathMonitoringDto[];
	id: string;
	asset: Asset;
	runFileLinks?: RunFileLink[];
}
export const fromRunAssetApi = (runAssetApi: RunAssetApi): RunAsset => ({
	paths: [...runAssetApi.paths],
	id: `${runAssetApi.id}`,
	asset: fromAssetApi(runAssetApi.asset),
	runFileLinks: runAssetApi.runFileLinks
		? runAssetApi.runFileLinks.map(fromRunFileLinkApi)
		: undefined
});
export default RunAsset;
