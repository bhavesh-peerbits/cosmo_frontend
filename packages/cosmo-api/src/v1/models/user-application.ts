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

import { Application } from './application';
import { User } from './user';
import { UserApplicationKey } from './user-application-key';

/**
 *
 * @export
 * @interface UserApplication
 */
export interface UserApplication {
	/**
	 *
	 * @type {UserApplicationKey}
	 * @memberof UserApplication
	 */
	userApplicationKey?: UserApplicationKey;
	/**
	 *
	 * @type {User}
	 * @memberof UserApplication
	 */
	user?: User;
	/**
	 *
	 * @type {Application}
	 * @memberof UserApplication
	 */
	application?: Application;
}