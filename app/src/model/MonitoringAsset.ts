import Asset from './Asset';
import PathMonitoring from './PathMonitoring';

interface MonitoringAsset {
	id: string;
	asset: Asset;
	paths: PathMonitoring[];
	extensions?: string;
}

export default MonitoringAsset;
