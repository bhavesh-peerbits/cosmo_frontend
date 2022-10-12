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

import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface StepResponseDto
 */
export interface StepResponseDto {
	/**
	 *
	 * @type {Set<UserDto>}
	 * @memberof StepResponseDto
	 */
	approvers?: Set<UserDto>;
	/**
	 *
	 * @type {UserDto}
	 * @memberof StepResponseDto
	 */
	reviewer?: UserDto;
	/**
	 *
	 * @type {string}
	 * @memberof StepResponseDto
	 */
	stepInfo?: string;
	/**
	 *
	 * @type {string}
	 * @memberof StepResponseDto
	 */
	type?: StepResponseDtoTypeEnum;
	/**
	 *
	 * @type {Set<UserDto>}
	 * @memberof StepResponseDto
	 */
	delegates?: Set<UserDto>;
	/**
	 *
	 * @type {string}
	 * @memberof StepResponseDto
	 */
	text?: string;
	/**
	 *
	 * @type {string}
	 * @memberof StepResponseDto
	 */
	completionDate?: string;
	/**
	 *
	 * @type {number}
	 * @memberof StepResponseDto
	 */
	id?: number;
}

export const StepResponseDtoTypeEnum = {
	Request: 'REQUEST',
	Approval: 'APPROVAL',
	Upload: 'UPLOAD'
} as const;

export type StepResponseDtoTypeEnum =
	typeof StepResponseDtoTypeEnum[keyof typeof StepResponseDtoTypeEnum];
