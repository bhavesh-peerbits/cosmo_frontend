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
import { FileLinkDto } from '../models';
// @ts-ignore
import { MonitoringDto } from '../models';
// @ts-ignore
import { RunDto } from '../models';
/**
 * FocalPointChangeMonitoringControllerApi - axios parameter creator
 * @export
 */
export const FocalPointChangeMonitoringControllerApiAxiosParamCreator = function (
	configuration?: Configuration
) {
	return {
		/**
		 *
		 * @param {number} runId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		closeCompletedRun: async (
			runId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'runId' is not null or undefined
			assertParamExists('closeCompletedRun', 'runId', runId);
			const localVarPath =
				`/api/change-monitoring/focal-point/run/close-completed/{runId}`.replace(
					`{${'runId'}}`,
					encodeURIComponent(String(runId))
				);
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options };
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
		 * @deprecated
		 * @throws {RequiredError}
		 */
		echo1: async (
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			const localVarPath = `/api/change-monitoring/focal-point`;
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
		 * @param {number} runId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllFilesAnswers: async (
			runId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'runId' is not null or undefined
			assertParamExists('getAllFilesAnswers', 'runId', runId);
			const localVarPath =
				`/api/change-monitoring/focal-point/run/{runId}/filelinks`.replace(
					`{${'runId'}}`,
					encodeURIComponent(String(runId))
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
		getAllMonitoring: async (
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			const localVarPath = `/api/change-monitoring/focal-point/get-all-monitoring`;
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
		 * @param {number} monitoringId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getMonitoring: async (
			monitoringId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'monitoringId' is not null or undefined
			assertParamExists('getMonitoring', 'monitoringId', monitoringId);
			const localVarPath =
				`/api/change-monitoring/focal-point/get-monitoring/{monitoringId}`.replace(
					`{${'monitoringId'}}`,
					encodeURIComponent(String(monitoringId))
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
		 * @param {number} runId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getRun: async (
			runId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'runId' is not null or undefined
			assertParamExists('getRun', 'runId', runId);
			const localVarPath = `/api/change-monitoring/focal-point/run/{runId}`.replace(
				`{${'runId'}}`,
				encodeURIComponent(String(runId))
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
		}
	};
};

/**
 * FocalPointChangeMonitoringControllerApi - functional programming interface
 * @export
 */
export const FocalPointChangeMonitoringControllerApiFp = function (
	configuration?: Configuration
) {
	const localVarAxiosParamCreator =
		FocalPointChangeMonitoringControllerApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @param {number} runId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async closeCompletedRun(
			runId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RunDto>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.closeCompletedRun(
				runId,
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
		 * @deprecated
		 * @throws {RequiredError}
		 */
		async echo1(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.echo1(
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
		 * @param {number} runId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getAllFilesAnswers(
			runId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<FileLinkDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getAllFilesAnswers(
				runId,
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
		async getAllMonitoring(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MonitoringDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getAllMonitoring(
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
		 * @param {number} monitoringId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getMonitoring(
			monitoringId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MonitoringDto>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getMonitoring(
				monitoringId,
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
		 * @param {number} runId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getRun(
			runId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RunDto>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getRun(
				runId,
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
 * FocalPointChangeMonitoringControllerApi - factory interface
 * @export
 */
export const FocalPointChangeMonitoringControllerApiFactory = function (
	configuration?: Configuration,
	basePath?: string,
	axios?: AxiosInstance
) {
	const localVarFp = FocalPointChangeMonitoringControllerApiFp(configuration);
	return {
		/**
		 *
		 * @param {number} runId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		closeCompletedRun(
			runId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<RunDto> {
			return localVarFp
				.closeCompletedRun(runId, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @deprecated
		 * @throws {RequiredError}
		 */
		echo1(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<string> {
			return localVarFp
				.echo1(acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} runId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllFilesAnswers(
			runId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<FileLinkDto>> {
			return localVarFp
				.getAllFilesAnswers(runId, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllMonitoring(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<MonitoringDto>> {
			return localVarFp
				.getAllMonitoring(acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} monitoringId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getMonitoring(
			monitoringId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<MonitoringDto> {
			return localVarFp
				.getMonitoring(monitoringId, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} runId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getRun(
			runId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<RunDto> {
			return localVarFp
				.getRun(runId, acceptLanguage, options)
				.then(request => request(axios, basePath));
		}
	};
};

/**
 * Request parameters for closeCompletedRun operation in FocalPointChangeMonitoringControllerApi.
 * @export
 * @interface FocalPointChangeMonitoringControllerApiCloseCompletedRunRequest
 */
export interface FocalPointChangeMonitoringControllerApiCloseCompletedRunRequest {
	/**
	 *
	 * @type {number}
	 * @memberof FocalPointChangeMonitoringControllerApiCloseCompletedRun
	 */
	readonly runId: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FocalPointChangeMonitoringControllerApiCloseCompletedRun
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for echo1 operation in FocalPointChangeMonitoringControllerApi.
 * @export
 * @interface FocalPointChangeMonitoringControllerApiEcho1Request
 */
export interface FocalPointChangeMonitoringControllerApiEcho1Request {
	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FocalPointChangeMonitoringControllerApiEcho1
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getAllFilesAnswers operation in FocalPointChangeMonitoringControllerApi.
 * @export
 * @interface FocalPointChangeMonitoringControllerApiGetAllFilesAnswersRequest
 */
export interface FocalPointChangeMonitoringControllerApiGetAllFilesAnswersRequest {
	/**
	 *
	 * @type {number}
	 * @memberof FocalPointChangeMonitoringControllerApiGetAllFilesAnswers
	 */
	readonly runId: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FocalPointChangeMonitoringControllerApiGetAllFilesAnswers
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getAllMonitoring operation in FocalPointChangeMonitoringControllerApi.
 * @export
 * @interface FocalPointChangeMonitoringControllerApiGetAllMonitoringRequest
 */
export interface FocalPointChangeMonitoringControllerApiGetAllMonitoringRequest {
	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FocalPointChangeMonitoringControllerApiGetAllMonitoring
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getMonitoring operation in FocalPointChangeMonitoringControllerApi.
 * @export
 * @interface FocalPointChangeMonitoringControllerApiGetMonitoringRequest
 */
export interface FocalPointChangeMonitoringControllerApiGetMonitoringRequest {
	/**
	 *
	 * @type {number}
	 * @memberof FocalPointChangeMonitoringControllerApiGetMonitoring
	 */
	readonly monitoringId: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FocalPointChangeMonitoringControllerApiGetMonitoring
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getRun operation in FocalPointChangeMonitoringControllerApi.
 * @export
 * @interface FocalPointChangeMonitoringControllerApiGetRunRequest
 */
export interface FocalPointChangeMonitoringControllerApiGetRunRequest {
	/**
	 *
	 * @type {number}
	 * @memberof FocalPointChangeMonitoringControllerApiGetRun
	 */
	readonly runId: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FocalPointChangeMonitoringControllerApiGetRun
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * FocalPointChangeMonitoringControllerApi - object-oriented interface
 * @export
 * @class FocalPointChangeMonitoringControllerApi
 * @extends {BaseAPI}
 */
export class FocalPointChangeMonitoringControllerApi extends BaseAPI {
	/**
	 *
	 * @param {FocalPointChangeMonitoringControllerApiCloseCompletedRunRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FocalPointChangeMonitoringControllerApi
	 */
	public closeCompletedRun(
		requestParameters: FocalPointChangeMonitoringControllerApiCloseCompletedRunRequest,
		options?: AxiosRequestConfig
	) {
		return FocalPointChangeMonitoringControllerApiFp(this.configuration)
			.closeCompletedRun(
				requestParameters.runId,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {FocalPointChangeMonitoringControllerApiEcho1Request} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @deprecated
	 * @throws {RequiredError}
	 * @memberof FocalPointChangeMonitoringControllerApi
	 */
	public echo1(
		requestParameters: FocalPointChangeMonitoringControllerApiEcho1Request = {},
		options?: AxiosRequestConfig
	) {
		return FocalPointChangeMonitoringControllerApiFp(this.configuration)
			.echo1(requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {FocalPointChangeMonitoringControllerApiGetAllFilesAnswersRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FocalPointChangeMonitoringControllerApi
	 */
	public getAllFilesAnswers(
		requestParameters: FocalPointChangeMonitoringControllerApiGetAllFilesAnswersRequest,
		options?: AxiosRequestConfig
	) {
		return FocalPointChangeMonitoringControllerApiFp(this.configuration)
			.getAllFilesAnswers(
				requestParameters.runId,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {FocalPointChangeMonitoringControllerApiGetAllMonitoringRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FocalPointChangeMonitoringControllerApi
	 */
	public getAllMonitoring(
		requestParameters: FocalPointChangeMonitoringControllerApiGetAllMonitoringRequest = {},
		options?: AxiosRequestConfig
	) {
		return FocalPointChangeMonitoringControllerApiFp(this.configuration)
			.getAllMonitoring(requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {FocalPointChangeMonitoringControllerApiGetMonitoringRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FocalPointChangeMonitoringControllerApi
	 */
	public getMonitoring(
		requestParameters: FocalPointChangeMonitoringControllerApiGetMonitoringRequest,
		options?: AxiosRequestConfig
	) {
		return FocalPointChangeMonitoringControllerApiFp(this.configuration)
			.getMonitoring(
				requestParameters.monitoringId,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {FocalPointChangeMonitoringControllerApiGetRunRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FocalPointChangeMonitoringControllerApi
	 */
	public getRun(
		requestParameters: FocalPointChangeMonitoringControllerApiGetRunRequest,
		options?: AxiosRequestConfig
	) {
		return FocalPointChangeMonitoringControllerApiFp(this.configuration)
			.getRun(requestParameters.runId, requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}
}