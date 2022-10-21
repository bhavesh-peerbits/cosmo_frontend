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
import { StepDto } from './step-dto';
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface EvidenceRequestDto
 */
export interface EvidenceRequestDto {
	/**
	 *
	 * @type {number}
	 * @memberof EvidenceRequestDto
	 */
	id: number;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	name: string;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	code: string;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	type?: string;
	/**
	 *
	 * @type {ApplicationDto}
	 * @memberof EvidenceRequestDto
	 */
	application: ApplicationDto;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	status: EvidenceRequestDtoStatusEnum;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	workflowName: string;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	workflowType?: string;
	/**
	 *
	 * @type {number}
	 * @memberof EvidenceRequestDto
	 */
	currentStep: number;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	dueDate: string;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	startDate: string;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	completionDate?: string;
	/**
	 *
	 * @type {Array<StepDto>}
	 * @memberof EvidenceRequestDto
	 */
	steps?: Array<StepDto>;
	/**
	 *
	 * @type {string}
	 * @memberof EvidenceRequestDto
	 */
	phaseType?: string;
	/**
	 *
	 * @type {Set<UserDto>}
	 * @memberof EvidenceRequestDto
	 */
	contributors?: Set<UserDto>;
	/**
	 *
	 * @type {UserDto}
	 * @memberof EvidenceRequestDto
	 */
	creator: UserDto;
}

export const EvidenceRequestDtoStatusEnum = {
	Draft: 'DRAFT',
	InProgress: 'IN_PROGRESS',
	Rejected: 'REJECTED',
	Completed: 'COMPLETED',
	Terminated: 'TERMINATED'
} as const;

export type EvidenceRequestDtoStatusEnum =
	typeof EvidenceRequestDtoStatusEnum[keyof typeof EvidenceRequestDtoStatusEnum];
