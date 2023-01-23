/* tslint:disable */
/* eslint-disable */
/**
 * COSMO Rest API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { PathDto } from './path-dto';

/**
 *
 * @export
 * @interface AssetDto
 */
export interface AssetDto {
	/**
	 * The id of the asset
	 * @type {number}
	 * @memberof AssetDto
	 */
	id: number;
	/**
	 * The hostname of the asset.
	 * @type {string}
	 * @memberof AssetDto
	 */
	hostname?: string;
	/**
	 * The ports used by the asset. Divided by \'~\'.
	 * @type {string}
	 * @memberof AssetDto
	 */
	ports?: string;
	/**
	 * The type of the asset.
	 * @type {string}
	 * @memberof AssetDto
	 */
	type?: AssetDtoTypeEnum;
	/**
	 * The os of the asset.
	 * @type {string}
	 * @memberof AssetDto
	 */
	os?: AssetDtoOsEnum;
	/**
	 * The ip of the asset.
	 * @type {string}
	 * @memberof AssetDto
	 */
	ip?: string;
	/**
	 * The db version of the asset, if its type is DB
	 * @type {string}
	 * @memberof AssetDto
	 */
	dbVersion?: string;
	/**
	 * The dbtype of the asset, if its type is DB
	 * @type {string}
	 * @memberof AssetDto
	 */
	dbType?: string;
	/**
	 * The paths of the asset
	 * @type {Array<PathDto>}
	 * @memberof AssetDto
	 */
	paths: Array<PathDto>;
	/**
	 * The extension to ignore
	 * @type {string}
	 * @memberof AssetDto
	 */
	extensions?: string;
}

export const AssetDtoTypeEnum = {
	Os: 'OS',
	Db: 'DB'
} as const;

export type AssetDtoTypeEnum = typeof AssetDtoTypeEnum[keyof typeof AssetDtoTypeEnum];
export const AssetDtoOsEnum = {
	Windows: 'WINDOWS',
	Unix: 'UNIX',
	Mainframe: 'MAINFRAME'
} as const;

export type AssetDtoOsEnum = typeof AssetDtoOsEnum[keyof typeof AssetDtoOsEnum];
