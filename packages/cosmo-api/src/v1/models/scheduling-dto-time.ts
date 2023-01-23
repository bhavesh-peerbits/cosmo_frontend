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

import { SchedulingDtoTimeOffset } from './scheduling-dto-time-offset';

/**
 * Time and Zone of the scheduling
 * @export
 * @interface SchedulingDtoTime
 */
export interface SchedulingDtoTime {
	/**
	 *
	 * @type {SchedulingDtoTimeOffset}
	 * @memberof SchedulingDtoTime
	 */
	offset?: SchedulingDtoTimeOffset;
	/**
	 *
	 * @type {number}
	 * @memberof SchedulingDtoTime
	 */
	hour?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SchedulingDtoTime
	 */
	minute?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SchedulingDtoTime
	 */
	second?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SchedulingDtoTime
	 */
	nano?: number;
}
