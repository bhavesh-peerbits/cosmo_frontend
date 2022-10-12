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

import { EvidenceRequestDraftResponseDto } from './evidence-request-draft-response-dto';
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface DraftResponseDto
 */
export interface DraftResponseDto {
	/**
	 *
	 * @type {Array<EvidenceRequestDraftResponseDto>}
	 * @memberof DraftResponseDto
	 */
	requests?: Array<EvidenceRequestDraftResponseDto>;
	/**
	 *
	 * @type {string}
	 * @memberof DraftResponseDto
	 */
	text?: string;
	/**
	 *
	 * @type {Array<UserDto>}
	 * @memberof DraftResponseDto
	 */
	collaborators?: Array<UserDto>;
	/**
	 *
	 * @type {UserDto}
	 * @memberof DraftResponseDto
	 */
	creator?: UserDto;
	/**
	 *
	 * @type {string}
	 * @memberof DraftResponseDto
	 */
	dueDate: string;
	/**
	 *
	 * @type {Array<any>}
	 * @memberof DraftResponseDto
	 */
	files?: Array<any>;
	/**
	 *
	 * @type {string}
	 * @memberof DraftResponseDto
	 */
	workflowType: string;
	/**
	 *
	 * @type {string}
	 * @memberof DraftResponseDto
	 */
	type?: string;
	/**
	 *
	 * @type {string}
	 * @memberof DraftResponseDto
	 */
	name?: string;
	/**
	 *
	 * @type {number}
	 * @memberof DraftResponseDto
	 */
	id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof DraftResponseDto
	 */
	stepInfo?: string;
}
