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

/**
 *
 * @export
 * @interface PathMonitoringDto
 */
export interface PathMonitoringDto {
	/**
	 * The list of the monitoring\'s names which the paths is involved
	 * @type {Array<string>}
	 * @memberof PathMonitoringDto
	 */
	monitoring?: Array<string>;
	/**
	 *
	 * @type {number}
	 * @memberof PathMonitoringDto
	 */
	id?: number;
	/**
	 * The path
	 * @type {string}
	 * @memberof PathMonitoringDto
	 */
	path: string;
	/**
	 * Tells if the path was selected in monitoring or run
	 * @type {boolean}
	 * @memberof PathMonitoringDto
	 */
	selected?: boolean;
}
