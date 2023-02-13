import Asset from '@model/Narrative/Asset';
import RunAsset from '@model/RunAsset';
import { PathMonitoringDto } from 'cosmo-api/src/v1';

export interface RunMonitoringAsset {
	id?: string;
	asset: Asset;
	paths: PathMonitoringDto[];
	extensions?: string;
}

export const fromRunMonitoringAssetToRunAsset = (val: RunMonitoringAsset): RunAsset => {
	return { id: val.id ?? '', asset: val.asset, paths: val.paths, runFileLinks: [] };
};
