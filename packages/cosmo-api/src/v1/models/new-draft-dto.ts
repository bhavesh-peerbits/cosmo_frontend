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
 * @interface NewDraftDto
 */
export interface NewDraftDto {
	/**
	 *
	 * @type {Array<string>}
	 * @memberof NewDraftDto
	 */
	workflowName: Array<string>;
	/**
	 *
	 * @type {Array<string>}
	 * @memberof NewDraftDto
	 */
	requestType: Array<string>;
	/**
	 *
	 * @type {Array<PhaseTypeDto>}
	 * @memberof NewDraftDto
	 */
	phaseType?: Array<PhaseTypeDto>;
}
