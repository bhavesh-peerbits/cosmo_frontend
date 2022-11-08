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
import { AssociationDto } from './association-dto';
import { StepDto } from './step-dto';

/**
 *
 * @export
 * @interface EvidenceRequestDraftDto
 */
export interface EvidenceRequestDraftDto {
	/**
	 *
	 * @type {ApplicationDto}
	 * @memberof EvidenceRequestDraftDto
	 */
	application: ApplicationDto;
	/**
	 *
	 * @type {Array<AssociationDto>}
	 * @memberof EvidenceRequestDraftDto
	 */
	associations?: Array<AssociationDto>;
	/**
	 *
	 * @type {Array<StepDto>}
	 * @memberof EvidenceRequestDraftDto
	 */
	steps: Array<StepDto>;
	/**
	 *
	 * @type {number}
	 * @memberof EvidenceRequestDraftDto
	 */
	id?: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof EvidenceRequestDraftDto
	 */
	selected: boolean;
}
