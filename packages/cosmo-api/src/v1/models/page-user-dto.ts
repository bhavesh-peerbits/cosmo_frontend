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

import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface PageUserDto
 */
export interface PageUserDto {
	/**
	 *
	 * @type {number}
	 * @memberof PageUserDto
	 */
	totalElements?: number;
	/**
	 *
	 * @type {number}
	 * @memberof PageUserDto
	 */
	totalPages?: number;
	/**
	 *
	 * @type {number}
	 * @memberof PageUserDto
	 */
	size?: number;
	/**
	 *
	 * @type {Array<UserDto>}
	 * @memberof PageUserDto
	 */
	content?: Array<UserDto>;
	/**
	 *
	 * @type {number}
	 * @memberof PageUserDto
	 */
	number?: number;
	/**
	 *
	 * @type {SortObject}
	 * @memberof PageUserDto
	 */
	sort?: SortObject;
	/**
	 *
	 * @type {boolean}
	 * @memberof PageUserDto
	 */
	first?: boolean;
	/**
	 *
	 * @type {boolean}
	 * @memberof PageUserDto
	 */
	last?: boolean;
	/**
	 *
	 * @type {number}
	 * @memberof PageUserDto
	 */
	numberOfElements?: number;
	/**
	 *
	 * @type {PageableObject}
	 * @memberof PageUserDto
	 */
	pageable?: PageableObject;
	/**
	 *
	 * @type {boolean}
	 * @memberof PageUserDto
	 */
	empty?: boolean;
}
