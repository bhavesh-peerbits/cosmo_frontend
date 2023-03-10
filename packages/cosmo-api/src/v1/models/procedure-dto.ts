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

/**
 * Procedure
 * @export
 * @interface ProcedureDto
 */
export interface ProcedureDto {
	/**
	 * Procedure id
	 * @type {number}
	 * @memberof ProcedureDto
	 */
	id: number;
	/**
	 * Procedure name
	 * @type {string}
	 * @memberof ProcedureDto
	 */
	name: string;
	/**
	 * Procedure description
	 * @type {string}
	 * @memberof ProcedureDto
	 */
	description?: string;
	/**
	 * Major procedure
	 * @type {string}
	 * @memberof ProcedureDto
	 */
	majorProcedure?: string;
	/**
	 * Set of control objectives
	 * @type {Array<string>}
	 * @memberof ProcedureDto
	 */
	controlObjectives?: Array<string>;
	/**
	 * Order number
	 * @type {number}
	 * @memberof ProcedureDto
	 */
	orderNumber?: number;
}
