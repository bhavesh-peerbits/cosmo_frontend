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
 * @interface AccessLoginDto
 */
export interface AccessLoginDto {
	/**
	 * The access token
	 * @type {string}
	 * @memberof AccessLoginDto
	 */
	accessToken?: string;
	/**
	 * The refresh token used to request a new access token
	 * @type {string}
	 * @memberof AccessLoginDto
	 */
	refreshToken?: string;
	/**
	 * The expiration time of the access token
	 * @type {number}
	 * @memberof AccessLoginDto
	 */
	expiresIn?: number;
	/**
	 * The expiration time of the refresh token
	 * @type {number}
	 * @memberof AccessLoginDto
	 */
	refreshExpiresIn?: number;
	/**
	 *
	 * @type {UserDto}
	 * @memberof AccessLoginDto
	 */
	user?: UserDto;
}
