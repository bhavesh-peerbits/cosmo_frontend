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
 * @interface AssociationDto
 */
export interface AssociationDto {
	/**
	 *
	 * @type {number}
	 * @memberof AssociationDto
	 */
	id?: number;
	/**
	 *
	 * @type {UserDto}
	 * @memberof AssociationDto
	 */
	reviewer?: UserDto;
	/**
	 *
	 * @type {Set<UserDto>}
	 * @memberof AssociationDto
	 */
	delegates?: Set<UserDto>;
}
