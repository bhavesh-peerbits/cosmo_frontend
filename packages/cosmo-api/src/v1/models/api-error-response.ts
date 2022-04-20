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

import { ValidationError } from './validation-error';

/**
 *
 * @export
 * @interface ApiErrorResponse
 */
export interface ApiErrorResponse {
	/**
	 * Response status string code
	 * @type {string}
	 * @memberof ApiErrorResponse
	 */
	status?: ApiErrorResponseStatusEnum;
	/**
	 * The datetime of error message
	 * @type {string}
	 * @memberof ApiErrorResponse
	 */
	timestamp?: string;
	/**
	 * The localized message string
	 * @type {string}
	 * @memberof ApiErrorResponse
	 */
	message?: string;
	/**
	 *
	 * @type {ValidationError}
	 * @memberof ApiErrorResponse
	 */
	errors?: ValidationError;
}

export const ApiErrorResponseStatusEnum = {
	_400BadRequest: '400 BAD_REQUEST',
	_401Unauthorized: '401 UNAUTHORIZED',
	_403Forbidden: '403 FORBIDDEN',
	_404NotFound: '404 NOT_FOUND',
	_500InternalServerError: '500 INTERNAL_SERVER_ERROR'
} as const;

export type ApiErrorResponseStatusEnum =
	typeof ApiErrorResponseStatusEnum[keyof typeof ApiErrorResponseStatusEnum];