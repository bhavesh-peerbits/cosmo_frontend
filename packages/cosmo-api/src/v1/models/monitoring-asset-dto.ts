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
import { PathMonitoringDto } from './path-monitoring-dto';

/**
 * Monitoring\'s assets
 * @export
 * @interface MonitoringAssetDto
 */
export interface MonitoringAssetDto {
	/**
	 *
	 * @type {number}
	 * @memberof MonitoringAssetDto
	 */
	id?: number;
	/**
	 *
	 * @type {AssetDto}
	 * @memberof MonitoringAssetDto
	 */
	asset: AssetDto;
	/**
	 *
	 * @type {Array<PathMonitoringDto>}
	 * @memberof MonitoringAssetDto
	 */
	paths: Array<PathMonitoringDto>;
	/**
	 *
	 * @type {string}
	 * @memberof MonitoringAssetDto
	 */
	extensions?: string;
}
