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

import { FileLinkDto } from './file-link-dto';

/**
 *
 * @export
 * @interface FileForDeltaDto
 */
export interface FileForDeltaDto {
	/**
	 *
	 * @type {Array<string>}
	 * @memberof FileForDeltaDto
	 */
	path?: Array<string>;
	/**
	 *
	 * @type {boolean}
	 * @memberof FileForDeltaDto
	 */
	old?: boolean;
	/**
	 *
	 * @type {FileLinkDto}
	 * @memberof FileForDeltaDto
	 */
	fileLink?: FileLinkDto;
}
