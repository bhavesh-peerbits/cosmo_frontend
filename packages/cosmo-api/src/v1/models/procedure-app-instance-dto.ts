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

import { ProcedureDto } from './procedure-dto';
import { UserDto } from './user-dto';

/**
 *
 * @export
 * @interface ProcedureAppInstanceDto
 */
export interface ProcedureAppInstanceDto {
	/**
	 * Application instance id
	 * @type {number}
	 * @memberof ProcedureAppInstanceDto
	 */
	id: number;
	/**
	 *
	 * @type {ProcedureDto}
	 * @memberof ProcedureAppInstanceDto
	 */
	procedure: ProcedureDto;
	/**
	 * Procedure name
	 * @type {string}
	 * @memberof ProcedureAppInstanceDto
	 */
	name?: string;
	/**
	 * Procedure description
	 * @type {string}
	 * @memberof ProcedureAppInstanceDto
	 */
	description?: string;
	/**
	 * Procedure last review
	 * @type {string}
	 * @memberof ProcedureAppInstanceDto
	 */
	lastReview?: string;
	/**
	 * Procedure last modify
	 * @type {string}
	 * @memberof ProcedureAppInstanceDto
	 */
	lastModify?: string;
	/**
	 *
	 * @type {UserDto}
	 * @memberof ProcedureAppInstanceDto
	 */
	owner?: UserDto;
	/**
	 * Procedure delegates
	 * @type {Array<UserDto>}
	 * @memberof ProcedureAppInstanceDto
	 */
	delegatedProcedureApp?: Array<UserDto>;
	/**
	 *
	 * @type {UserDto}
	 * @memberof ProcedureAppInstanceDto
	 */
	lastReviewer?: UserDto;
	/**
	 *
	 * @type {UserDto}
	 * @memberof ProcedureAppInstanceDto
	 */
	lastModifier?: UserDto;
}
