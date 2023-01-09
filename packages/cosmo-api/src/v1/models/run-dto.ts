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

import { DeltaDto } from './delta-dto';
import { RunAssetDto } from './run-asset-dto';
import { RunFileLinkDto } from './run-file-link-dto';
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface RunDto
 */
export interface RunDto {
	/**
	 *
	 * @type {number}
	 * @memberof RunDto
	 */
	id: number;
	/**
	 *
	 * @type {number}
	 * @memberof RunDto
	 */
	orderNumber: number;
	/**
	 *
	 * @type {string}
	 * @memberof RunDto
	 */
	status: RunDtoStatusEnum;
	/**
	 *
	 * @type {string}
	 * @memberof RunDto
	 */
	startingDate?: string;
	/**
	 *
	 * @type {string}
	 * @memberof RunDto
	 */
	completionDate?: string;
	/**
	 *
	 * @type {UserDto}
	 * @memberof RunDto
	 */
	completionUser?: UserDto;
	/**
	 *
	 * @type {UserDto}
	 * @memberof RunDto
	 */
	focalPoint?: UserDto;
	/**
	 *
	 * @type {Set<UserDto>}
	 * @memberof RunDto
	 */
	focalPointDelegates?: Set<UserDto>;
	/**
	 *
	 * @type {Set<RunAssetDto>}
	 * @memberof RunDto
	 */
	runAsset: Set<RunAssetDto>;
	/**
	 *
	 * @type {Set<DeltaDto>}
	 * @memberof RunDto
	 */
	deltas?: Set<DeltaDto>;
	/**
	 *
	 * @type {Set<RunFileLinkDto>}
	 * @memberof RunDto
	 */
	runFileLinks?: Set<RunFileLinkDto>;
	/**
	 *
	 * @type {string}
	 * @memberof RunDto
	 */
	notes?: string;
}

export const RunDtoStatusEnum = {
	Planned: 'PLANNED',
	Completed: 'COMPLETED',
	Setup: 'SETUP',
	Upload: 'UPLOAD',
	WaitingForFocalpoint: 'WAITING_FOR_FOCALPOINT',
	WaitingForAnalyst: 'WAITING_FOR_ANALYST',
	Terminated: 'TERMINATED'
} as const;

export type RunDtoStatusEnum = typeof RunDtoStatusEnum[keyof typeof RunDtoStatusEnum];
