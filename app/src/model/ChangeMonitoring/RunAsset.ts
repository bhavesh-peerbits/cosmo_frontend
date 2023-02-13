import { RunAssetApi } from 'cosmo-api';
import { PathMonitoringDto } from 'cosmo-api/src/v1';
import Asset, { fromAssetApi, toAssetApi } from '../Narrative/Asset';
import RunFileLink, { fromRunFileLinkApi, toRunFileLinkApi } from './RunFileLink';

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

export const toRunAssetApi = (runAsset: RunAsset): RunAssetApi => ({
	paths: runAsset.paths,
	id: +runAsset.id,
	asset: toAssetApi(runAsset.asset),
	runFileLinks: runAsset.runFileLinks
		? runAsset.runFileLinks.map(toRunFileLinkApi)
		: undefined
});
export default RunAsset;
