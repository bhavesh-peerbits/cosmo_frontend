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

import { FileLink } from './file-link';
import { User } from './user';

/**
 *
 * @export
 * @interface JustificationDeltaFile
 */
export interface JustificationDeltaFile {
	/**
	 *
	 * @type {number}
	 * @memberof JustificationDeltaFile
	 */
	id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof JustificationDeltaFile
	 */
	value?: string;
	/**
	 *
	 * @type {Array<FileLink>}
	 * @memberof JustificationDeltaFile
	 */
	file?: Array<FileLink>;
	/**
	 *
	 * @type {string}
	 * @memberof JustificationDeltaFile
	 */
	status?: JustificationDeltaFileStatusEnum;
	/**
	 *
	 * @type {User}
	 * @memberof JustificationDeltaFile
	 */
	givenBy?: User;
	/**
	 *
	 * @type {string}
	 * @memberof JustificationDeltaFile
	 */
	givenAt?: string;
}

export const JustificationDeltaFileStatusEnum = {
	ToAnswer: 'TO_ANSWER',
	Answered: 'ANSWERED',
	Ignore: 'IGNORE',
	None: 'NONE'
} as const;

export type JustificationDeltaFileStatusEnum =
	typeof JustificationDeltaFileStatusEnum[keyof typeof JustificationDeltaFileStatusEnum];
