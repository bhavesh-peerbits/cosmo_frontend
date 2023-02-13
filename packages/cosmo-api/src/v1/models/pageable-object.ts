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

import { SortObject } from './sort-object';

/**
 *
 * @export
 * @interface PageableObject
 */
export interface PageableObject {
	/**
	 *
	 * @type {number}
	 * @memberof PageableObject
	 */
	offset?: number;
	/**
	 *
	 * @type {SortObject}
	 * @memberof PageableObject
	 */
	sort?: SortObject;
	/**
	 *
	 * @type {number}
	 * @memberof PageableObject
	 */
	pageNumber?: number;
	/**
	 *
	 * @type {number}
	 * @memberof PageableObject
	 */
	pageSize?: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof PageableObject
	 */
	unpaged?: boolean;
	/**
	 *
	 * @type {boolean}
	 * @memberof PageableObject
	 */
	paged?: boolean;
}
