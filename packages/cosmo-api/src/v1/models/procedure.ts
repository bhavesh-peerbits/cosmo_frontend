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
 * @interface Procedure
 */
export interface Procedure {
	/**
	 *
	 * @type {number}
	 * @memberof Procedure
	 */
	id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Procedure
	 */
	majorProcedure?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Procedure
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Procedure
	 */
	description?: string;
	/**
	 *
	 * @type {Set<string>}
	 * @memberof Procedure
	 */
	controlObjectives?: Set<string>;
}
