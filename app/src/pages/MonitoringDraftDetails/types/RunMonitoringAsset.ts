import Asset from '@model/Asset';
import { PathMonitoringDto } from 'cosmo-api/src/v1';

export interface RunMonitoringAsset {
	id?: string;
	asset: Asset;
	paths: PathMonitoringDto[];
	extensions?: string;
}
