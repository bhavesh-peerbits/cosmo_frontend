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

import { Association } from './association';
import { FileLink } from './file-link';
import { FrameworkTree } from './framework-tree';
import { Instance } from './instance';
import { MonitoringAsset } from './monitoring-asset';
import { Run } from './run';
import { Scheduling } from './scheduling';
import { Script } from './script';
import { Tenant } from './tenant';
import { User } from './user';

/**
 *
 * @export
 * @interface Monitoring
 */
export interface Monitoring {
	/**
	 *
	 * @type {Tenant}
	 * @memberof Monitoring
	 */
	tenant?: Tenant;
	/**
	 *
	 * @type {number}
	 * @memberof Monitoring
	 */
	id?: number;
	/**
	 *
	 * @type {Array<Run>}
	 * @memberof Monitoring
	 */
	runs?: Array<Run>;
	/**
	 *
	 * @type {string}
	 * @memberof Monitoring
	 */
	name?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof Monitoring
	 */
	type?: boolean;
	/**
	 *
	 * @type {User}
	 * @memberof Monitoring
	 */
	owner?: User;
	/**
	 *
	 * @type {User}
	 * @memberof Monitoring
	 */
	focalPoint?: User;
	/**
	 *
	 * @type {Array<User>}
	 * @memberof Monitoring
	 */
	focalPointDelegates?: Array<User>;
	/**
	 *
	 * @type {Array<User>}
	 * @memberof Monitoring
	 */
	collaborators?: Array<User>;
	/**
	 *
	 * @type {Scheduling}
	 * @memberof Monitoring
	 */
	schedule?: Scheduling;
	/**
	 *
	 * @type {number}
	 * @memberof Monitoring
	 */
	currentRun?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Monitoring
	 */
	status?: MonitoringStatusEnum;
	/**
	 *
	 * @type {Script}
	 * @memberof Monitoring
	 */
	script?: Script;
	/**
	 *
	 * @type {string}
	 * @memberof Monitoring
	 */
	completionDate?: string;
	/**
	 *
	 * @type {User}
	 * @memberof Monitoring
	 */
	completionUser?: User;
	/**
	 *
	 * @type {Instance}
	 * @memberof Monitoring
	 */
	instance?: Instance;
	/**
	 *
	 * @type {Array<FileLink>}
	 * @memberof Monitoring
	 */
	files?: Array<FileLink>;
	/**
	 *
	 * @type {Array<MonitoringAsset>}
	 * @memberof Monitoring
	 */
	monitoringAssets?: Array<MonitoringAsset>;
	/**
	 *
	 * @type {Array<FrameworkTree>}
	 * @memberof Monitoring
	 */
	leafs?: Array<FrameworkTree>;
	/**
	 *
	 * @type {Array<Association>}
	 * @memberof Monitoring
	 */
	controls?: Array<Association>;
	/**
	 *
	 * @type {string}
	 * @memberof Monitoring
	 */
	notes?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Monitoring
	 */
	frameworkName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Monitoring
	 */
	controlCode?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Monitoring
	 */
	frameworkLeafsName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Monitoring
	 */
	frameworkLeafsCode?: string;
}

export const MonitoringStatusEnum = {
	Draft: 'DRAFT',
	Pending: 'PENDING',
	Ongoing: 'ONGOING',
	Completed: 'COMPLETED',
	Terminated: 'TERMINATED'
} as const;

export type MonitoringStatusEnum =
	typeof MonitoringStatusEnum[keyof typeof MonitoringStatusEnum];
