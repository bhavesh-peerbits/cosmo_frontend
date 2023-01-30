import { AssetApi } from 'cosmo-api';
import { AssetDtoOsEnum, AssetDtoTypeEnum, PathDto } from 'cosmo-api/src/v1';

interface Asset {
	id: string;
	hostname?: string;
	ports?: string;
	type?: AssetDtoTypeEnum;
	os?: AssetDtoOsEnum;
	ip: string;
	dbVersion?: string;
	dbType?: string;
	paths: PathDto[];
	extensions?: string;
}

export const fromAssetApi = (assetApi: AssetApi): Asset => ({
	id: `${assetApi.id}`,
	hostname: assetApi.hostname,
	ports: assetApi.ports,
	type: assetApi.type,
	os: assetApi.os,
	ip: assetApi.ip,
	dbVersion: assetApi.dbVersion,
	dbType: assetApi.dbType,
	paths: assetApi.paths ? [...assetApi.paths] : [],
	extensions: assetApi.extensions
});

export const toAssetApi = (asset: Asset): AssetApi => ({
	id: +asset.id,
	hostname: asset.hostname,
	ports: asset.ports,
	type: asset.type,
	os: asset.os,
	ip: asset.ip,
	dbVersion: asset.dbVersion,
	dbType: asset.dbType,
	paths: asset.paths,
	extensions: asset.extensions
});

export default Asset;
