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

import { AssetDto } from './asset-dto';
import { InstanceDto } from './instance-dto';

/**
 *
 * @export
 * @interface InstanceAssetDto
 */
export interface InstanceAssetDto {
	/**
	 *
	 * @type {InstanceDto}
	 * @memberof InstanceAssetDto
	 */
	instance: InstanceDto;
	/**
	 * Asset of the instance
	 * @type {Array<AssetDto>}
	 * @memberof InstanceAssetDto
	 */
	assets: Array<AssetDto>;
}
