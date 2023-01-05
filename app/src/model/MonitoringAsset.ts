import { MonitoringAssetApi } from 'cosmo-api';
import Asset, { fromAssetApi } from './Asset';
import PathMonitoring from './PathMonitoring';

interface MonitoringAsset {
	id: string;
	asset: Asset;
	paths: PathMonitoring[];
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

export default MonitoringAsset;
