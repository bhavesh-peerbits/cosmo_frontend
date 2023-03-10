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
import { ApplicationDto } from '../models';
// @ts-ignore
import { MultipleNarrativeReviewBody } from '../models';
// @ts-ignore
import { NarrativeReviewBody } from '../models';
// @ts-ignore
import { ProcedureAppInstanceDto } from '../models';
/**
 * NarrativeReviewControllerApi - axios parameter creator
 * @export
 */
export const NarrativeReviewControllerApiAxiosParamCreator = function (
	configuration?: Configuration
) {
	return {
		/**
		 *
		 * @param {number} appId
		 * @param {number} procId
		 * @param {NarrativeReviewBody} narrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		startReviewOfAProcedure: async (
			appId: number,
			procId: number,
			narrativeReviewBody: NarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'appId' is not null or undefined
			assertParamExists('startReviewOfAProcedure', 'appId', appId);
			// verify required parameter 'procId' is not null or undefined
			assertParamExists('startReviewOfAProcedure', 'procId', procId);
			// verify required parameter 'narrativeReviewBody' is not null or undefined
			assertParamExists(
				'startReviewOfAProcedure',
				'narrativeReviewBody',
				narrativeReviewBody
			);
			const localVarPath = `/api/narrativeReview/application/{appId}/procedure/{procId}`
				.replace(`{${'appId'}}`, encodeURIComponent(String(appId)))
				.replace(`{${'procId'}}`, encodeURIComponent(String(procId)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
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
				narrativeReviewBody,
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
		 * @param {number} appId
		 * @param {NarrativeReviewBody} narrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		startReviewOfAnApplication: async (
			appId: number,
			narrativeReviewBody: NarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'appId' is not null or undefined
			assertParamExists('startReviewOfAnApplication', 'appId', appId);
			// verify required parameter 'narrativeReviewBody' is not null or undefined
			assertParamExists(
				'startReviewOfAnApplication',
				'narrativeReviewBody',
				narrativeReviewBody
			);
			const localVarPath = `/api/narrativeReview/application/{appId}`.replace(
				`{${'appId'}}`,
				encodeURIComponent(String(appId))
			);
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
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
				narrativeReviewBody,
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
		 * @param {MultipleNarrativeReviewBody} multipleNarrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		startReviewOfApplications: async (
			multipleNarrativeReviewBody: MultipleNarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'multipleNarrativeReviewBody' is not null or undefined
			assertParamExists(
				'startReviewOfApplications',
				'multipleNarrativeReviewBody',
				multipleNarrativeReviewBody
			);
			const localVarPath = `/api/narrativeReview/applications`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
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
				multipleNarrativeReviewBody,
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
		 * @param {number} appId
		 * @param {MultipleNarrativeReviewBody} multipleNarrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		startReviewOfProcedures: async (
			appId: number,
			multipleNarrativeReviewBody: MultipleNarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'appId' is not null or undefined
			assertParamExists('startReviewOfProcedures', 'appId', appId);
			// verify required parameter 'multipleNarrativeReviewBody' is not null or undefined
			assertParamExists(
				'startReviewOfProcedures',
				'multipleNarrativeReviewBody',
				multipleNarrativeReviewBody
			);
			const localVarPath = `/api/narrativeReview/application/{appId}/procedures`.replace(
				`{${'appId'}}`,
				encodeURIComponent(String(appId))
			);
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
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
				multipleNarrativeReviewBody,
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
 * NarrativeReviewControllerApi - functional programming interface
 * @export
 */
export const NarrativeReviewControllerApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator =
		NarrativeReviewControllerApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @param {number} appId
		 * @param {number} procId
		 * @param {NarrativeReviewBody} narrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async startReviewOfAProcedure(
			appId: number,
			procId: number,
			narrativeReviewBody: NarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProcedureAppInstanceDto>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.startReviewOfAProcedure(
				appId,
				procId,
				narrativeReviewBody,
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
		 * @param {number} appId
		 * @param {NarrativeReviewBody} narrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async startReviewOfAnApplication(
			appId: number,
			narrativeReviewBody: NarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplicationDto>
		> {
			const localVarAxiosArgs =
				await localVarAxiosParamCreator.startReviewOfAnApplication(
					appId,
					narrativeReviewBody,
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
		 * @param {MultipleNarrativeReviewBody} multipleNarrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async startReviewOfApplications(
			multipleNarrativeReviewBody: MultipleNarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ApplicationDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.startReviewOfApplications(
				multipleNarrativeReviewBody,
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
		 * @param {number} appId
		 * @param {MultipleNarrativeReviewBody} multipleNarrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async startReviewOfProcedures(
			appId: number,
			multipleNarrativeReviewBody: MultipleNarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(
				axios?: AxiosInstance,
				basePath?: string
			) => AxiosPromise<Array<ProcedureAppInstanceDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.startReviewOfProcedures(
				appId,
				multipleNarrativeReviewBody,
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
 * NarrativeReviewControllerApi - factory interface
 * @export
 */
export const NarrativeReviewControllerApiFactory = function (
	configuration?: Configuration,
	basePath?: string,
	axios?: AxiosInstance
) {
	const localVarFp = NarrativeReviewControllerApiFp(configuration);
	return {
		/**
		 *
		 * @param {number} appId
		 * @param {number} procId
		 * @param {NarrativeReviewBody} narrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		startReviewOfAProcedure(
			appId: number,
			procId: number,
			narrativeReviewBody: NarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<ProcedureAppInstanceDto> {
			return localVarFp
				.startReviewOfAProcedure(
					appId,
					procId,
					narrativeReviewBody,
					acceptLanguage,
					options
				)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} appId
		 * @param {NarrativeReviewBody} narrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		startReviewOfAnApplication(
			appId: number,
			narrativeReviewBody: NarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<ApplicationDto> {
			return localVarFp
				.startReviewOfAnApplication(appId, narrativeReviewBody, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {MultipleNarrativeReviewBody} multipleNarrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		startReviewOfApplications(
			multipleNarrativeReviewBody: MultipleNarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<ApplicationDto>> {
			return localVarFp
				.startReviewOfApplications(multipleNarrativeReviewBody, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} appId
		 * @param {MultipleNarrativeReviewBody} multipleNarrativeReviewBody
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		startReviewOfProcedures(
			appId: number,
			multipleNarrativeReviewBody: MultipleNarrativeReviewBody,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<ProcedureAppInstanceDto>> {
			return localVarFp
				.startReviewOfProcedures(
					appId,
					multipleNarrativeReviewBody,
					acceptLanguage,
					options
				)
				.then(request => request(axios, basePath));
		}
	};
};

/**
 * Request parameters for startReviewOfAProcedure operation in NarrativeReviewControllerApi.
 * @export
 * @interface NarrativeReviewControllerApiStartReviewOfAProcedureRequest
 */
export interface NarrativeReviewControllerApiStartReviewOfAProcedureRequest {
	/**
	 *
	 * @type {number}
	 * @memberof NarrativeReviewControllerApiStartReviewOfAProcedure
	 */
	readonly appId: number;

	/**
	 *
	 * @type {number}
	 * @memberof NarrativeReviewControllerApiStartReviewOfAProcedure
	 */
	readonly procId: number;

	/**
	 *
	 * @type {NarrativeReviewBody}
	 * @memberof NarrativeReviewControllerApiStartReviewOfAProcedure
	 */
	readonly narrativeReviewBody: NarrativeReviewBody;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof NarrativeReviewControllerApiStartReviewOfAProcedure
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for startReviewOfAnApplication operation in NarrativeReviewControllerApi.
 * @export
 * @interface NarrativeReviewControllerApiStartReviewOfAnApplicationRequest
 */
export interface NarrativeReviewControllerApiStartReviewOfAnApplicationRequest {
	/**
	 *
	 * @type {number}
	 * @memberof NarrativeReviewControllerApiStartReviewOfAnApplication
	 */
	readonly appId: number;

	/**
	 *
	 * @type {NarrativeReviewBody}
	 * @memberof NarrativeReviewControllerApiStartReviewOfAnApplication
	 */
	readonly narrativeReviewBody: NarrativeReviewBody;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof NarrativeReviewControllerApiStartReviewOfAnApplication
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for startReviewOfApplications operation in NarrativeReviewControllerApi.
 * @export
 * @interface NarrativeReviewControllerApiStartReviewOfApplicationsRequest
 */
export interface NarrativeReviewControllerApiStartReviewOfApplicationsRequest {
	/**
	 *
	 * @type {MultipleNarrativeReviewBody}
	 * @memberof NarrativeReviewControllerApiStartReviewOfApplications
	 */
	readonly multipleNarrativeReviewBody: MultipleNarrativeReviewBody;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof NarrativeReviewControllerApiStartReviewOfApplications
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for startReviewOfProcedures operation in NarrativeReviewControllerApi.
 * @export
 * @interface NarrativeReviewControllerApiStartReviewOfProceduresRequest
 */
export interface NarrativeReviewControllerApiStartReviewOfProceduresRequest {
	/**
	 *
	 * @type {number}
	 * @memberof NarrativeReviewControllerApiStartReviewOfProcedures
	 */
	readonly appId: number;

	/**
	 *
	 * @type {MultipleNarrativeReviewBody}
	 * @memberof NarrativeReviewControllerApiStartReviewOfProcedures
	 */
	readonly multipleNarrativeReviewBody: MultipleNarrativeReviewBody;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof NarrativeReviewControllerApiStartReviewOfProcedures
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * NarrativeReviewControllerApi - object-oriented interface
 * @export
 * @class NarrativeReviewControllerApi
 * @extends {BaseAPI}
 */
export class NarrativeReviewControllerApi extends BaseAPI {
	/**
	 *
	 * @param {NarrativeReviewControllerApiStartReviewOfAProcedureRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof NarrativeReviewControllerApi
	 */
	public startReviewOfAProcedure(
		requestParameters: NarrativeReviewControllerApiStartReviewOfAProcedureRequest,
		options?: AxiosRequestConfig
	) {
		return NarrativeReviewControllerApiFp(this.configuration)
			.startReviewOfAProcedure(
				requestParameters.appId,
				requestParameters.procId,
				requestParameters.narrativeReviewBody,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {NarrativeReviewControllerApiStartReviewOfAnApplicationRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof NarrativeReviewControllerApi
	 */
	public startReviewOfAnApplication(
		requestParameters: NarrativeReviewControllerApiStartReviewOfAnApplicationRequest,
		options?: AxiosRequestConfig
	) {
		return NarrativeReviewControllerApiFp(this.configuration)
			.startReviewOfAnApplication(
				requestParameters.appId,
				requestParameters.narrativeReviewBody,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {NarrativeReviewControllerApiStartReviewOfApplicationsRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof NarrativeReviewControllerApi
	 */
	public startReviewOfApplications(
		requestParameters: NarrativeReviewControllerApiStartReviewOfApplicationsRequest,
		options?: AxiosRequestConfig
	) {
		return NarrativeReviewControllerApiFp(this.configuration)
			.startReviewOfApplications(
				requestParameters.multipleNarrativeReviewBody,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {NarrativeReviewControllerApiStartReviewOfProceduresRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof NarrativeReviewControllerApi
	 */
	public startReviewOfProcedures(
		requestParameters: NarrativeReviewControllerApiStartReviewOfProceduresRequest,
		options?: AxiosRequestConfig
	) {
		return NarrativeReviewControllerApiFp(this.configuration)
			.startReviewOfProcedures(
				requestParameters.appId,
				requestParameters.multipleNarrativeReviewBody,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}
}
