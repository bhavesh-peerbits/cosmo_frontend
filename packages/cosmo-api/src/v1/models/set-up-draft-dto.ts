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

import { PhaseTypeDto } from './phase-type-dto';

/**
 *
 * @export
 * @interface SetUpDraftDto
 */
export interface SetUpDraftDto {
	/**
	 *
	 * @type {string}
	 * @memberof SetUpDraftDto
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof SetUpDraftDto
	 */
	workflowname: string;
	/**
	 *
	 * @type {string}
	 * @memberof SetUpDraftDto
	 */
	requestType: string;
	/**
	 *
	 * @type {PhaseTypeDto}
	 * @memberof SetUpDraftDto
	 */
	phaseType?: PhaseTypeDto;
}
