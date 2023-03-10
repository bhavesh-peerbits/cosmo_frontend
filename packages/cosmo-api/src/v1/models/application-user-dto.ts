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

import { ApplicationDto } from './application-dto';
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface ApplicationUserDto
 */
export interface ApplicationUserDto {
	/**
	 *
	 * @type {ApplicationDto}
	 * @memberof ApplicationUserDto
	 */
	application: ApplicationDto;
	/**
	 * The user who can access application, if analysts
	 * @type {Array<UserDto>}
	 * @memberof ApplicationUserDto
	 */
	users?: Array<UserDto>;
}
