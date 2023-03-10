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

import { Delta } from './delta';
import { Monitoring } from './monitoring';
import { RunAsset } from './run-asset';
import { User } from './user';

/**
 *
 * @export
 * @interface Run
 */
export interface Run {
	/**
	 *
	 * @type {number}
	 * @memberof Run
	 */
	id?: number;
	/**
	 *
	 * @type {number}
	 * @memberof Run
	 */
	orderNumber?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Run
	 */
	status?: RunStatusEnum;
	/**
	 *
	 * @type {string}
	 * @memberof Run
	 */
	startingDate?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Run
	 */
	completionDate?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Run
	 */
	dueDate?: string;
	/**
	 *
	 * @type {User}
	 * @memberof Run
	 */
	completionUser?: User;
	/**
	 *
	 * @type {User}
	 * @memberof Run
	 */
	focalPoint?: User;
	/**
	 *
	 * @type {Array<User>}
	 * @memberof Run
	 */
	focalPointDelegates?: Array<User>;
	/**
	 *
	 * @type {Monitoring}
	 * @memberof Run
	 */
	monitoring?: Monitoring;
	/**
	 *
	 * @type {Array<RunAsset>}
	 * @memberof Run
	 */
	runAsset?: Array<RunAsset>;
	/**
	 *
	 * @type {Array<Delta>}
	 * @memberof Run
	 */
	deltas?: Array<Delta>;
	/**
	 *
	 * @type {string}
	 * @memberof Run
	 */
	notes?: string;
}

export const RunStatusEnum = {
	Planned: 'PLANNED',
	Completed: 'COMPLETED',
	Setup: 'SETUP',
	Upload: 'UPLOAD',
	WaitingForFocalpoint: 'WAITING_FOR_FOCALPOINT',
	WaitingForAnalyst: 'WAITING_FOR_ANALYST',
	Terminated: 'TERMINATED'
} as const;

export type RunStatusEnum = typeof RunStatusEnum[keyof typeof RunStatusEnum];
