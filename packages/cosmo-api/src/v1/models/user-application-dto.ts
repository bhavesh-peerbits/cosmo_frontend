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

/**
 *
 * @export
 * @interface UserApplicationDto
 */
export interface UserApplicationDto {
	/**
	 *
	 * @type {string}
	 * @memberof UserApplicationDto
	 */
	userId: string;
	/**
	 *
	 * @type {Array<ApplicationDto>}
	 * @memberof UserApplicationDto
	 */
	applications?: Array<ApplicationDto>;
}
