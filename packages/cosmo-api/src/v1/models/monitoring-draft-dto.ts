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
import { SchedulingDto } from './scheduling-dto';
import { ScriptDto } from './script-dto';
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface MonitoringDraftDto
 */
export interface MonitoringDraftDto {
	/**
	 * Monitoring\'s id.
	 * @type {number}
	 * @memberof MonitoringDraftDto
	 */
	id: number;
	/**
	 * Monitoring\'s name.
	 * @type {string}
	 * @memberof MonitoringDraftDto
	 */
	name: string;
	/**
	 * Monitoring\'s type. True for automatic else false.
	 * @type {boolean}
	 * @memberof MonitoringDraftDto
	 */
	type: boolean;
	/**
	 *
	 * @type {UserDto}
	 * @memberof MonitoringDraftDto
	 */
	owner: UserDto;
	/**
	 *
	 * @type {UserDto}
	 * @memberof MonitoringDraftDto
	 */
	focalPoint?: UserDto;
	/**
	 * Focalpoint\'s delegates
	 * @type {Array<UserDto>}
	 * @memberof MonitoringDraftDto
	 */
	delegates?: Array<UserDto>;
	/**
	 * Monitoring\'s collaborators
	 * @type {Array<UserDto>}
	 * @memberof MonitoringDraftDto
	 */
	collaborators?: Array<UserDto>;
	/**
	 *
	 * @type {InstanceDto}
	 * @memberof MonitoringDraftDto
	 */
	instance?: InstanceDto;
	/**
	 * Monitoring\'s assets
	 * @type {Array<MonitoringAssetDto>}
	 * @memberof MonitoringDraftDto
	 */
	monitoringAssets?: Array<MonitoringAssetDto>;
	/**
	 * Monitoring\'s control code. It\'s the string concatenation of the control codes by \'-\'
	 * @type {string}
	 * @memberof MonitoringDraftDto
	 */
	controlCode?: string;
	/**
	 *
	 * @type {ScriptDto}
	 * @memberof MonitoringDraftDto
	 */
	script?: ScriptDto;
	/**
	 * Monitoring\'s status.
	 * @type {string}
	 * @memberof MonitoringDraftDto
	 */
	status: MonitoringDraftDtoStatusEnum;
	/**
	 * Monitoring\'s status.
	 * @type {string}
	 * @memberof MonitoringDraftDto
	 */
	note?: string;
	/**
	 *
	 * @type {SchedulingDto}
	 * @memberof MonitoringDraftDto
	 */
	scheduling?: SchedulingDto;
	/**
	 * The concatenation of the names of the leaf.
	 * @type {string}
	 * @memberof MonitoringDraftDto
	 */
	frameworkLeafsName?: string;
	/**
	 * The concatenation of the codes of the leaf.
	 * @type {string}
	 * @memberof MonitoringDraftDto
	 */
	frameworkLeafsCodes?: string;
	/**
	 * The nameof the framework
	 * @type {string}
	 * @memberof MonitoringDraftDto
	 */
	frameworkName?: string;
	/**
	 * Files associated with the monitoring.
	 * @type {Array<FileLinkDto>}
	 * @memberof MonitoringDraftDto
	 */
	files?: Array<FileLinkDto>;
}

export const MonitoringDraftDtoStatusEnum = {
	Draft: 'DRAFT',
	Pending: 'PENDING',
	Ongoing: 'ONGOING',
	Completed: 'COMPLETED',
	Terminated: 'TERMINATED'
} as const;

export type MonitoringDraftDtoStatusEnum =
	typeof MonitoringDraftDtoStatusEnum[keyof typeof MonitoringDraftDtoStatusEnum];
