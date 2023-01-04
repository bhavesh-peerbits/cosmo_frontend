import { AssetDtoOsEnum, AssetDtoTypeEnum, Inet } from 'cosmo-api/src/v1';
import Path from './Path';

interface Asset {
	id: number;
	hostname?: string;
	ports?: string;
	type?: AssetDtoTypeEnum;
	os?: AssetDtoOsEnum;
	ip?: Inet;
	dbVersion?: string;
	dbType?: string;
	paths: Path[];
	extensions?: string;
}
export default Asset;
