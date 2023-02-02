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

import { Asset } from './asset';
import { PathMonitoring } from './path-monitoring';
import { Run } from './run';
import { RunFileLink } from './run-file-link';

/**
 *
 * @export
 * @interface RunAsset
 */
export interface RunAsset {
	/**
	 *
	 * @type {number}
	 * @memberof RunAsset
	 */
	id?: number;
	/**
	 *
	 * @type {Run}
	 * @memberof RunAsset
	 */
	run?: Run;
	/**
	 *
	 * @type {Asset}
	 * @memberof RunAsset
	 */
	asset?: Asset;
	/**
	 *
	 * @type {Array<RunFileLink>}
	 * @memberof RunAsset
	 */
	runFileLinks?: Array<RunFileLink>;
	/**
	 *
	 * @type {Array<PathMonitoring>}
	 * @memberof RunAsset
	 */
	paths?: Array<PathMonitoring>;
}