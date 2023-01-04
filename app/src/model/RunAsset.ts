import Asset from './Asset';
import PathMonitoring from './PathMonitoring';

interface RunAsset {
	paths: PathMonitoring[];
	id: number;
	asset: Asset;
}
export default RunAsset;
