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
 *
 * @export
 * @interface ResponseDto
 */
export interface ResponseDto {
	/**
	 * Answer type
	 * @type {string}
	 * @memberof ResponseDto
	 */
	answerType?: ResponseDtoAnswerTypeEnum;
	/**
	 * Additional note about this user review
	 * @type {string}
	 * @memberof ResponseDto
	 */
	note?: string;
}

export const ResponseDtoAnswerTypeEnum = {
	Modify: 'MODIFY',
	ReportError: 'REPORT_ERROR',
	Lock: 'LOCK',
	Ok: 'OK'
} as const;

export type ResponseDtoAnswerTypeEnum =
	typeof ResponseDtoAnswerTypeEnum[keyof typeof ResponseDtoAnswerTypeEnum];
