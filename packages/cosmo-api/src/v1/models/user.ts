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

import { Tenant } from './tenant';

/**
 *
 * @export
 * @interface User
 */
export interface User {
	/**
	 *
	 * @type {Tenant}
	 * @memberof User
	 */
	tenant?: Tenant;
	/**
	 *
	 * @type {string}
	 * @memberof User
	 */
	id?: string;
	/**
	 *
	 * @type {string}
	 * @memberof User
	 */
	username?: string;
	/**
	 *
	 * @type {string}
	 * @memberof User
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof User
	 */
	surname?: string;
	/**
	 *
	 * @type {string}
	 * @memberof User
	 */
	email?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof User
	 */
	active?: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof User
	 */
	deletedAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof User
	 */
	image?: string;
}
