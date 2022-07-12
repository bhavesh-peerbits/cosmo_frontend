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
 * @interface AccessTokenResponse
 */
export interface AccessTokenResponse {
	/**
	 *
	 * @type {string}
	 * @memberof AccessTokenResponse
	 */
	access_token?: string;
	/**
	 *
	 * @type {number}
	 * @memberof AccessTokenResponse
	 */
	expires_in?: number;
	/**
	 *
	 * @type {number}
	 * @memberof AccessTokenResponse
	 */
	refresh_expires_in?: number;
	/**
	 *
	 * @type {string}
	 * @memberof AccessTokenResponse
	 */
	refresh_token?: string;
	/**
	 *
	 * @type {string}
	 * @memberof AccessTokenResponse
	 */
	token_type?: string;
	/**
	 *
	 * @type {string}
	 * @memberof AccessTokenResponse
	 */
	id_token?: string;
	/**
	 *
	 * @type {number}
	 * @memberof AccessTokenResponse
	 */
	'not-before-policy'?: number;
	/**
	 *
	 * @type {string}
	 * @memberof AccessTokenResponse
	 */
	session_state?: string;
	/**
	 *
	 * @type {string}
	 * @memberof AccessTokenResponse
	 */
	scope?: string;
	/**
	 *
	 * @type {string}
	 * @memberof AccessTokenResponse
	 */
	error?: string;
	/**
	 *
	 * @type {string}
	 * @memberof AccessTokenResponse
	 */
	error_description?: string;
	/**
	 *
	 * @type {string}
	 * @memberof AccessTokenResponse
	 */
	error_uri?: string;
}