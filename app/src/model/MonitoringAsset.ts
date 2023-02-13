import { MonitoringAssetApi } from 'cosmo-api';
import { PathMonitoringDto } from 'cosmo-api/src/v1';
import Asset, { fromAssetApi, toAssetApi } from './Narrative/Asset';

interface MonitoringAsset {
	id?: string;
	asset: Asset;
	paths: PathMonitoringDto[];
	extensions?: string;
}

export const fromMonitoringAssetApi = (
	monitoringAssetApi: MonitoringAssetApi
): MonitoringAsset => ({
	id: `${monitoringAssetApi.id}`,
	asset: fromAssetApi(monitoringAssetApi.asset),
	paths: [...monitoringAssetApi.paths],
	extensions: monitoringAssetApi.extensions
});

export const toMonitoringAssetApi = (
	monitoringAsset: MonitoringAsset
): MonitoringAssetApi => ({
	id: monitoringAsset.id ? +monitoringAsset.id : undefined,
	asset: toAssetApi(monitoringAsset.asset),
	paths: [...monitoringAsset.paths],
	extensions: monitoringAsset.extensions
});

export default MonitoringAsset;
