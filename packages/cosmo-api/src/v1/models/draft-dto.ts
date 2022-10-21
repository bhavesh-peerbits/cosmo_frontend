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

import { EvidenceRequestDraftDto } from './evidence-request-draft-dto';
import { FileLinkDto } from './file-link-dto';
import { PhaseType } from './phase-type';
import { UserDto } from './user-dto';
import { Workflow } from './workflow';

/**
 *
 * @export
 * @interface DraftDto
 */
export interface DraftDto {
	/**
	 *
	 * @type {Array<EvidenceRequestDraftDto>}
	 * @memberof DraftDto
	 */
	requests?: Array<EvidenceRequestDraftDto>;
	/**
	 *
	 * @type {string}
	 * @memberof DraftDto
	 */
	text?: string;
	/**
	 *
	 * @type {Set<UserDto>}
	 * @memberof DraftDto
	 */
	collaborators?: Set<UserDto>;
	/**
	 *
	 * @type {UserDto}
	 * @memberof DraftDto
	 */
	creator: UserDto;
	/**
	 *
	 * @type {string}
	 * @memberof DraftDto
	 */
	dueDate?: string;
	/**
	 *
	 * @type {Array<FileLinkDto>}
	 * @memberof DraftDto
	 */
	files?: Array<FileLinkDto>;
	/**
	 *
	 * @type {PhaseType}
	 * @memberof DraftDto
	 */
	phaseType?: PhaseType;
	/**
	 *
	 * @type {Workflow}
	 * @memberof DraftDto
	 */
	workflow: Workflow;
	/**
	 *
	 * @type {string}
	 * @memberof DraftDto
	 */
	type: string;
	/**
	 *
	 * @type {string}
	 * @memberof DraftDto
	 */
	name?: string;
	/**
	 *
	 * @type {number}
	 * @memberof DraftDto
	 */
	id?: number;
	/**
	 *
	 * @type {{ [key: string]: string | undefined; }}
	 * @memberof DraftDto
	 */
	stepInfo?: { [key: string]: string | undefined };
}
