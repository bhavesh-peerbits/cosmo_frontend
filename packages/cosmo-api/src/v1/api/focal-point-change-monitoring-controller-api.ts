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
import { InlineObject16 } from '../models';
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
		echo: async (
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
		 * @param {number} deltaId
		 * @param {Array<number>} requestBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getCsvAnswer: async (
			deltaId: number,
			requestBody: Array<number>,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'deltaId' is not null or undefined
			assertParamExists('getCsvAnswer', 'deltaId', deltaId);
			// verify required parameter 'requestBody' is not null or undefined
			assertParamExists('getCsvAnswer', 'requestBody', requestBody);
			const localVarPath =
				`/api/change-monitoring/focal-point/get-csv-answer/{deltaId}`.replace(
					`{${'deltaId'}}`,
					encodeURIComponent(String(deltaId))
				);
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			// authentication bearerAuth required
			await setApiKeyToObject(localVarHeaderParameter, 'Authorization', configuration);

			if (acceptLanguage !== undefined && acceptLanguage !== null) {
				localVarHeaderParameter['Accept-Language'] = String(acceptLanguage);
			}

			localVarHeaderParameter['Content-Type'] = 'application/json';

			setSearchParams(localVarUrlObj, localVarQueryParameter);
			let headersFromBaseOptions =
				baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {
				...localVarHeaderParameter,
				...headersFromBaseOptions,
				...options.headers
			};
			localVarRequestOptions.data = serializeDataIfNeeded(
				requestBody,
				localVarRequestOptions,
				configuration
			);

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
		},
		/**
		 *
		 * @param {number} deltaId
		 * @param {InlineObject16} inlineObject16
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		uploadCsvAnswer: async (
			deltaId: number,
			inlineObject16: InlineObject16,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'deltaId' is not null or undefined
			assertParamExists('uploadCsvAnswer', 'deltaId', deltaId);
			// verify required parameter 'inlineObject16' is not null or undefined
			assertParamExists('uploadCsvAnswer', 'inlineObject16', inlineObject16);
			const localVarPath =
				`/api/change-monitoring/focal-point/upload-csv-answer/{deltaId}`.replace(
					`{${'deltaId'}}`,
					encodeURIComponent(String(deltaId))
				);
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			// authentication bearerAuth required
			await setApiKeyToObject(localVarHeaderParameter, 'Authorization', configuration);

			if (acceptLanguage !== undefined && acceptLanguage !== null) {
				localVarHeaderParameter['Accept-Language'] = String(acceptLanguage);
			}

			localVarHeaderParameter['Content-Type'] = 'application/json';

			setSearchParams(localVarUrlObj, localVarQueryParameter);
			let headersFromBaseOptions =
				baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {
				...localVarHeaderParameter,
				...headersFromBaseOptions,
				...options.headers
			};
			localVarRequestOptions.data = serializeDataIfNeeded(
				inlineObject16,
				localVarRequestOptions,
				configuration
			);

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
		async echo(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.echo(
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
		 * @param {number} deltaId
		 * @param {Array<number>} requestBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getCsvAnswer(
			deltaId: number,
			requestBody: Array<number>,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getCsvAnswer(
				deltaId,
				requestBody,
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
		},
		/**
		 *
		 * @param {number} deltaId
		 * @param {InlineObject16} inlineObject16
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async uploadCsvAnswer(
			deltaId: number,
			inlineObject16: InlineObject16,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.uploadCsvAnswer(
				deltaId,
				inlineObject16,
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
		echo(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<string> {
			return localVarFp
				.echo(acceptLanguage, options)
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
		 * @param {number} deltaId
		 * @param {Array<number>} requestBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getCsvAnswer(
			deltaId: number,
			requestBody: Array<number>,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<object> {
			return localVarFp
				.getCsvAnswer(deltaId, requestBody, acceptLanguage, options)
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
		},
		/**
		 *
		 * @param {number} deltaId
		 * @param {InlineObject16} inlineObject16
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		uploadCsvAnswer(
			deltaId: number,
			inlineObject16: InlineObject16,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<void> {
			return localVarFp
				.uploadCsvAnswer(deltaId, inlineObject16, acceptLanguage, options)
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
 * Request parameters for echo operation in FocalPointChangeMonitoringControllerApi.
 * @export
 * @interface FocalPointChangeMonitoringControllerApiEchoRequest
 */
export interface FocalPointChangeMonitoringControllerApiEchoRequest {
	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FocalPointChangeMonitoringControllerApiEcho
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
 * Request parameters for getCsvAnswer operation in FocalPointChangeMonitoringControllerApi.
 * @export
 * @interface FocalPointChangeMonitoringControllerApiGetCsvAnswerRequest
 */
export interface FocalPointChangeMonitoringControllerApiGetCsvAnswerRequest {
	/**
	 *
	 * @type {number}
	 * @memberof FocalPointChangeMonitoringControllerApiGetCsvAnswer
	 */
	readonly deltaId: number;

	/**
	 *
	 * @type {Array<number>}
	 * @memberof FocalPointChangeMonitoringControllerApiGetCsvAnswer
	 */
	readonly requestBody: Array<number>;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FocalPointChangeMonitoringControllerApiGetCsvAnswer
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
 * Request parameters for uploadCsvAnswer operation in FocalPointChangeMonitoringControllerApi.
 * @export
 * @interface FocalPointChangeMonitoringControllerApiUploadCsvAnswerRequest
 */
export interface FocalPointChangeMonitoringControllerApiUploadCsvAnswerRequest {
	/**
	 *
	 * @type {number}
	 * @memberof FocalPointChangeMonitoringControllerApiUploadCsvAnswer
	 */
	readonly deltaId: number;

	/**
	 *
	 * @type {InlineObject16}
	 * @memberof FocalPointChangeMonitoringControllerApiUploadCsvAnswer
	 */
	readonly inlineObject16: InlineObject16;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof FocalPointChangeMonitoringControllerApiUploadCsvAnswer
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
	 * @param {FocalPointChangeMonitoringControllerApiEchoRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @deprecated
	 * @throws {RequiredError}
	 * @memberof FocalPointChangeMonitoringControllerApi
	 */
	public echo(
		requestParameters: FocalPointChangeMonitoringControllerApiEchoRequest = {},
		options?: AxiosRequestConfig
	) {
		return FocalPointChangeMonitoringControllerApiFp(this.configuration)
			.echo(requestParameters.acceptLanguage, options)
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
	 * @param {FocalPointChangeMonitoringControllerApiGetCsvAnswerRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FocalPointChangeMonitoringControllerApi
	 */
	public getCsvAnswer(
		requestParameters: FocalPointChangeMonitoringControllerApiGetCsvAnswerRequest,
		options?: AxiosRequestConfig
	) {
		return FocalPointChangeMonitoringControllerApiFp(this.configuration)
			.getCsvAnswer(
				requestParameters.deltaId,
				requestParameters.requestBody,
				requestParameters.acceptLanguage,
				options
			)
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

	/**
	 *
	 * @param {FocalPointChangeMonitoringControllerApiUploadCsvAnswerRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FocalPointChangeMonitoringControllerApi
	 */
	public uploadCsvAnswer(
		requestParameters: FocalPointChangeMonitoringControllerApiUploadCsvAnswerRequest,
		options?: AxiosRequestConfig
	) {
		return FocalPointChangeMonitoringControllerApiFp(this.configuration)
			.uploadCsvAnswer(
				requestParameters.deltaId,
				requestParameters.inlineObject16,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}
}
