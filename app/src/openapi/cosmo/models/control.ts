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

import { Frequency } from './frequency';

/**
 *
 * @export
 * @interface Control
 */
export interface Control {
	/**
	 *
	 * @type {number}
	 * @memberof Control
	 */
	id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Control
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Control
	 */
	description?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Control
	 */
	layer?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof Control
	 */
	significance?: boolean;
	/**
	 *
	 * @type {Frequency}
	 * @memberof Control
	 */
	frequency?: Frequency;
}
