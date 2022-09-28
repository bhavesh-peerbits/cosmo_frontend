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
import { FileLinkDto } from './file-link-dto';
import { StepRequestDto } from './step-request-dto';
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface EvidenceRequestRequestDto
 */
export interface EvidenceRequestRequestDto {
	/**
	 *
	 * @type {number}
	 * @memberof EvidenceRequestRequestDto
	 */
	id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestRequestDto
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestRequestDto
	 */
	code?: string;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestRequestDto
	 */
	type?: EvidenceRequestRequestDtoTypeEnum;
	/**
	 *
	 * @type {ApplicationDto}
	 * @memberof EvidenceRequestRequestDto
	 */
	application?: ApplicationDto;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestRequestDto
	 */
	status?: EvidenceRequestRequestDtoStatusEnum;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestRequestDto
	 */
	workflowName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestRequestDto
	 */
	workflowType?: string;
	/**
	 *
	 * @type {number}
	 * @memberof EvidenceRequestRequestDto
	 */
	currentStep?: number;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestRequestDto
	 */
	dueDate?: string;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestRequestDto
	 */
	startDate?: string;
	/**
	 *
	 * @type {Array<StepRequestDto>}
	 * @memberof EvidenceRequestRequestDto
	 */
	steps?: Array<StepRequestDto>;
	/**
	 *
	 * @type {Set<FileLinkDto>}
	 * @memberof EvidenceRequestRequestDto
	 */
	fileLinks?: Set<FileLinkDto>;
	/**
	 *
	 * @type {Set<UserDto>}
	 * @memberof EvidenceRequestRequestDto
	 */
	contributors?: Set<UserDto>;
}

export const EvidenceRequestRequestDtoTypeEnum = {
	Type1: 'TYPE1',
	Type2: 'TYPE2',
	Type3: 'TYPE3'
} as const;

export type EvidenceRequestRequestDtoTypeEnum =
	typeof EvidenceRequestRequestDtoTypeEnum[keyof typeof EvidenceRequestRequestDtoTypeEnum];
export const EvidenceRequestRequestDtoStatusEnum = {
	Draft: 'DRAFT',
	InProgress: 'IN_PROGRESS',
	Closed: 'CLOSED'
} as const;

export type EvidenceRequestRequestDtoStatusEnum =
	typeof EvidenceRequestRequestDtoStatusEnum[keyof typeof EvidenceRequestRequestDtoStatusEnum];
