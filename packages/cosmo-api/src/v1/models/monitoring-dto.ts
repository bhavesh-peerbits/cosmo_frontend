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
import { InstanceDto } from './instance-dto';
import { MonitoringAssetDto } from './monitoring-asset-dto';
import { RunDto } from './run-dto';
import { SchedulingDto } from './scheduling-dto';
import { ScriptDto } from './script-dto';
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface MonitoringDto
 */
export interface MonitoringDto {
	/**
	 * Monitoring\'s id.
	 * @type {number}
	 * @memberof MonitoringDto
	 */
	id: number;
	/**
	 * Monitoring\'s name.
	 * @type {string}
	 * @memberof MonitoringDto
	 */
	name: string;
	/**
	 * Monitoring\'s type. True for automatic else false.
	 * @type {boolean}
	 * @memberof MonitoringDto
	 */
	type: boolean;
	/**
	 *
	 * @type {UserDto}
	 * @memberof MonitoringDto
	 */
	owner: UserDto;
	/**
	 *
	 * @type {UserDto}
	 * @memberof MonitoringDto
	 */
	focalPoint: UserDto;
	/**
	 * Focalpoint\'s delegates
	 * @type {Set<UserDto>}
	 * @memberof MonitoringDto
	 */
	delegates?: Set<UserDto>;
	/**
	 * Monitoring\'s collaborators
	 * @type {Set<UserDto>}
	 * @memberof MonitoringDto
	 */
	collaborators?: Set<UserDto>;
	/**
	 *
	 * @type {InstanceDto}
	 * @memberof MonitoringDto
	 */
	instance: InstanceDto;
	/**
	 * Monitoring\'s assets
	 * @type {Set<MonitoringAssetDto>}
	 * @memberof MonitoringDto
	 */
	monitoringAssets: Set<MonitoringAssetDto>;
	/**
	 * Monitoring\'s control code. It\'s the string concatenation of the control codes by \'-\'
	 * @type {string}
	 * @memberof MonitoringDto
	 */
	controlCode: string;
	/**
	 *
	 * @type {ScriptDto}
	 * @memberof MonitoringDto
	 */
	script: ScriptDto;
	/**
	 * Monitoring\'s status.
	 * @type {string}
	 * @memberof MonitoringDto
	 */
	status: MonitoringDtoStatusEnum;
	/**
	 * Monitoring\'s status.
	 * @type {string}
	 * @memberof MonitoringDto
	 */
	note?: string;
	/**
	 *
	 * @type {SchedulingDto}
	 * @memberof MonitoringDto
	 */
	scheduling: SchedulingDto;
	/**
	 * Monitoring\'s current run.
	 * @type {number}
	 * @memberof MonitoringDto
	 */
	currentRun?: number;
	/**
	 * Monitoring\'s completion date.
	 * @type {string}
	 * @memberof MonitoringDto
	 */
	completionDate?: string;
	/**
	 *
	 * @type {UserDto}
	 * @memberof MonitoringDto
	 */
	completionUser?: UserDto;
	/**
	 * The concatenation of the names of the leaf.
	 * @type {string}
	 * @memberof MonitoringDto
	 */
	frameworkLeafs: string;
	/**
	 * The run associated with the monitoring.
	 * @type {Set<RunDto>}
	 * @memberof MonitoringDto
	 */
	runs: Set<RunDto>;
	/**
	 * Files associated with the monitoring.
	 * @type {Set<FileLinkDto>}
	 * @memberof MonitoringDto
	 */
	files?: Set<FileLinkDto>;
}

export const MonitoringDtoStatusEnum = {
	Draft: 'DRAFT',
	Pending: 'PENDING',
	Ongoing: 'ONGOING',
	Completed: 'COMPLETED',
	WaitingForFocalpoint: 'WAITING_FOR_FOCALPOINT',
	WaitingForAnalyst: 'WAITING_FOR_ANALYST',
	Terminated: 'TERMINATED'
} as const;

export type MonitoringDtoStatusEnum =
	typeof MonitoringDtoStatusEnum[keyof typeof MonitoringDtoStatusEnum];
