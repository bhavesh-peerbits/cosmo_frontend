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
 * @interface InstanceDto
 */
export interface InstanceDto {
	/**
	 * The id of the instance
	 * @type {number}
	 * @memberof InstanceDto
	 */
	id: number;
	/**
	 * The name of the instance.
	 * @type {string}
	 * @memberof InstanceDto
	 */
	name: string;
	/**
	 * The description of the instance.
	 * @type {string}
	 * @memberof InstanceDto
	 */
	description?: string;
	/**
	 *
	 * @type {ApplicationDto}
	 * @memberof InstanceDto
	 */
	application: ApplicationDto;
}