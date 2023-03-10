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
 * @interface StepDto
 */
export interface StepDto {
	/**
	 *
	 * @type {Array<UserDto>}
	 * @memberof StepDto
	 */
	approvers?: Array<UserDto>;
	/**
	 *
	 * @type {UserDto}
	 * @memberof StepDto
	 */
	reviewer?: UserDto;
	/**
	 *
	 * @type {{ [key: string]: string | undefined; }}
	 * @memberof StepDto
	 */
	stepInfo?: { [key: string]: string | undefined };
	/**
	 *
	 * @type {string}
	 * @memberof StepDto
	 */
	type: StepDtoTypeEnum;
	/**
	 *
	 * @type {Array<UserDto>}
	 * @memberof StepDto
	 */
	delegates?: Array<UserDto>;
	/**
	 *
	 * @type {string}
	 * @memberof StepDto
	 */
	text?: string;
	/**
	 *
	 * @type {number}
	 * @memberof StepDto
	 */
	stepOrder: number;
	/**
	 *
	 * @type {Array<FileLinkDto>}
	 * @memberof StepDto
	 */
	fileLinks?: Array<FileLinkDto>;
	/**
	 *
	 * @type {string}
	 * @memberof StepDto
	 */
	stepName?: string;
	/**
	 *
	 * @type {UserDto}
	 * @memberof StepDto
	 */
	completionUser?: UserDto;
	/**
	 *
	 * @type {string}
	 * @memberof StepDto
	 */
	completionDate?: string;
	/**
	 *
	 * @type {number}
	 * @memberof StepDto
	 */
	id?: number;
}

export const StepDtoTypeEnum = {
	Request: 'REQUEST',
	Approval: 'APPROVAL',
	Upload: 'UPLOAD'
} as const;

export type StepDtoTypeEnum = typeof StepDtoTypeEnum[keyof typeof StepDtoTypeEnum];
