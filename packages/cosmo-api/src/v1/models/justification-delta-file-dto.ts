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
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface JustificationDeltaFileDto
 */
export interface JustificationDeltaFileDto {
	/**
	 *
	 * @type {number}
	 * @memberof JustificationDeltaFileDto
	 */
	id: number;
	/**
	 *
	 * @type {string}
	 * @memberof JustificationDeltaFileDto
	 */
	value?: string;
	/**
	 *
	 * @type {Array<FileLinkDto>}
	 * @memberof JustificationDeltaFileDto
	 */
	files?: Array<FileLinkDto>;
	/**
	 *
	 * @type {string}
	 * @memberof JustificationDeltaFileDto
	 */
	status?: JustificationDeltaFileDtoStatusEnum;
	/**
	 *
	 * @type {UserDto}
	 * @memberof JustificationDeltaFileDto
	 */
	givenBy?: UserDto;
	/**
	 *
	 * @type {string}
	 * @memberof JustificationDeltaFileDto
	 */
	givenAt?: string;
}

export const JustificationDeltaFileDtoStatusEnum = {
	ToAnswer: 'TO_ANSWER',
	Answered: 'ANSWERED',
	Ignore: 'IGNORE'
} as const;

export type JustificationDeltaFileDtoStatusEnum =
	typeof JustificationDeltaFileDtoStatusEnum[keyof typeof JustificationDeltaFileDtoStatusEnum];
