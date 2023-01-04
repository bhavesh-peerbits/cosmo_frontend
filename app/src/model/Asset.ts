import { AssetApi } from 'cosmo-api';
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

export const fromAssetApi = (assetApi: AssetApi): Asset => ({
	id: assetApi.id,
	hostname: assetApi.hostname,
	ports: assetApi.ports,
	type: assetApi.type,
	os: assetApi.os,
	ip: assetApi.ip,
	dbVersion: assetApi.dbVersion,
	dbType: assetApi.dbType,
	paths: [...assetApi.paths],
	extensions: assetApi.extensions
});
export default Asset;
