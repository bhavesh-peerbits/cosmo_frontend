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

import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import {
	DUMMY_BASE_URL,
	assertParamExists,
	setApiKeyToObject,
	setBasicAuthToObject,
	setBearerAuthToObject,
	setOAuthToObject,
	setSearchParams,
	serializeDataIfNeeded,
	toPathString,
	createRequestFunction
} from '../common';
// @ts-ignore
import {
	BASE_PATH,
	COLLECTION_FORMATS,
	RequestArgs,
	BaseAPI,
	RequiredError
} from '../base';
// @ts-ignore
import { ApiErrorResponse } from '../models';
// @ts-ignore
import { FrameworkTreeDto } from '../models';
/**
 * FrameworkTreeForEvidenceControllerApi - axios parameter creator
 * @export
 */
export const FrameworkTreeForEvidenceControllerApiAxiosParamCreator = function (
	configuration?: Configuration
) {
	return {
		/**
		 *
		 * @param {string} code
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getFrameworkTreeByCode: async (
			code: string,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'code' is not null or undefined
			assertParamExists('getFrameworkTreeByCode', 'code', code);
			const localVarPath = `/api/analyst/evidence-request/framework/{code}`.replace(
				`{${'code'}}`,
				encodeURIComponent(String(code))
			);
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			// authentication bearerAuth required
			await setApiKeyToObject(localVarHeaderParameter, 'Authorization', configuration);

			if (acceptLanguage !== undefined && acceptLanguage !== null) {
				localVarHeaderParameter['Accept-Language'] = String(acceptLanguage);
			}

			setSearchParams(localVarUrlObj, localVarQueryParameter);
			let headersFromBaseOptions =
				baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {
				...localVarHeaderParameter,
				...headersFromBaseOptions,
				...options.headers
			};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getFrameworkTreeRoots: async (
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			const localVarPath = `/api/analyst/evidence-request/framework/roots`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			// authentication bearerAuth required
			await setApiKeyToObject(localVarHeaderParameter, 'Authorization', configuration);

			if (acceptLanguage !== undefined && acceptLanguage !== null) {
				localVarHeaderParameter['Accept-Language'] = String(acceptLanguage);
			}

			setSearchParams(localVarUrlObj, localVarQueryParameter);
			let headersFromBaseOptions =
				baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {
				...localVarHeaderParameter,
				...headersFromBaseOptions,
				...options.headers
			};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * FrameworkTreeForEvidenceControllerApi - functional programming interface
 * @export
 */
export const FrameworkTreeForEvidenceControllerApiFp = function (
	configuration?: Configuration
) {
	const localVarAxiosParamCreator =
		FrameworkTreeForEvidenceControllerApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @param {string} code
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getFrameworkTreeByCode(
			code: string,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FrameworkTreeDto>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getFrameworkTreeByCode(
				code,
				acceptLanguage,
				options
			);
			return createRequestFunction(
				localVarAxiosArgs,
				globalAxios,
				BASE_PATH,
				configuration
			);
		},
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getFrameworkTreeRoots(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<FrameworkTreeDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getFrameworkTreeRoots(
				acceptLanguage,
				options
			);
			return createRequestFunction(
				localVarAxiosArgs,
				globalAxios,
				BASE_PATH,
				configuration
			);
		}
	};
};

/**
 * FrameworkTreeForEvidenceControllerApi - factory interface
 * @export
 */
export const FrameworkTreeForEvidenceControllerApiFactory = function (
	configuration?: Configuration,
	basePath?: string,
	axios?: AxiosInstance
) {
	const localVarFp = FrameworkTreeForEvidenceControllerApiFp(configuration);
	return {
		/**
		 *
		 * @param {string} code
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getFrameworkTreeByCode(
			code: string,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<FrameworkTreeDto> {
			return localVarFp
				.getFrameworkTreeByCode(code, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getFrameworkTreeRoots(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<FrameworkTreeDto>> {
			return localVarFp
				.getFrameworkTreeRoots(acceptLanguage, options)
				.then(request => request(axios, basePath));
		}
	};
};

/**
 * Request parameters for getFrameworkTreeByCode operation in FrameworkTreeForEvidenceControllerApi.
 * @export
 * @interface FrameworkTreeForEvidenceControllerApiGetFrameworkTreeByCodeRequest
 */
export interface FrameworkTreeForEvidenceControllerApiGetFrameworkTreeByCodeRequest {
	/**
	 *
	 * @type {string}
	 * @memberof FrameworkTreeForEvidenceControllerApiGetFrameworkTreeByCode
	 */
	readonly code: string;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FrameworkTreeForEvidenceControllerApiGetFrameworkTreeByCode
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getFrameworkTreeRoots operation in FrameworkTreeForEvidenceControllerApi.
 * @export
 * @interface FrameworkTreeForEvidenceControllerApiGetFrameworkTreeRootsRequest
 */
export interface FrameworkTreeForEvidenceControllerApiGetFrameworkTreeRootsRequest {
	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FrameworkTreeForEvidenceControllerApiGetFrameworkTreeRoots
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * FrameworkTreeForEvidenceControllerApi - object-oriented interface
 * @export
 * @class FrameworkTreeForEvidenceControllerApi
 * @extends {BaseAPI}
 */
export class FrameworkTreeForEvidenceControllerApi extends BaseAPI {
	/**
	 *
	 * @param {FrameworkTreeForEvidenceControllerApiGetFrameworkTreeByCodeRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FrameworkTreeForEvidenceControllerApi
	 */
	public getFrameworkTreeByCode(
		requestParameters: FrameworkTreeForEvidenceControllerApiGetFrameworkTreeByCodeRequest,
		options?: AxiosRequestConfig
	) {
		return FrameworkTreeForEvidenceControllerApiFp(this.configuration)
			.getFrameworkTreeByCode(
				requestParameters.code,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {FrameworkTreeForEvidenceControllerApiGetFrameworkTreeRootsRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FrameworkTreeForEvidenceControllerApi
	 */
	public getFrameworkTreeRoots(
		requestParameters: FrameworkTreeForEvidenceControllerApiGetFrameworkTreeRootsRequest = {},
		options?: AxiosRequestConfig
	) {
		return FrameworkTreeForEvidenceControllerApiFp(this.configuration)
			.getFrameworkTreeRoots(requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}
}
