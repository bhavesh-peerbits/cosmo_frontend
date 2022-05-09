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

import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface ApplicationDto
 */
export interface ApplicationDto {
	/**
	 * Application id
	 * @type {number}
	 * @memberof ApplicationDto
	 */
	id: number;
	/**
	 * Application code name
	 * @type {string}
	 * @memberof ApplicationDto
	 */
	codeName: string;
	/**
	 * Application name
	 * @type {string}
	 * @memberof ApplicationDto
	 */
	name: string;
	/**
	 * Application description
	 * @type {string}
	 * @memberof ApplicationDto
	 */
	description?: string;
	/**
	 * Application icon
	 * @type {string}
	 * @memberof ApplicationDto
	 */
	icon: string;
	/**
	 * Last Review Date
	 * @type {string}
	 * @memberof ApplicationDto
	 */
	lastReview?: string;
	/**
	 *
	 * @type {Array<UserDto>}
	 * @memberof ApplicationDto
	 */
	delegates?: Array<UserDto>;
	/**
	 *
	 * @type {string}
	 * @memberof ApplicationDto
	 */
	lastModify?: string;
	/**
	 *
	 * @type {UserDto}
	 * @memberof ApplicationDto
	 */
	owner: UserDto;
	/**
	 *
	 * @type {{ [key: string]: string | undefined; }}
	 * @memberof ApplicationDto
	 */
	applicationData?: { [key: string]: string | undefined };
}
