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
 * @interface Tenant
 */
export interface Tenant {
	/**
	 *
	 * @type {number}
	 * @memberof Tenant
	 */
	id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Tenant
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Tenant
	 */
	description?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Tenant
	 */
	linkToProduction?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Tenant
	 */
	logoImagePosition?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Tenant
	 */
	jsonTenantData?: string;
}
