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
import { InlineObject3 } from '../models';
// @ts-ignore
import { InlineObject4 } from '../models';
// @ts-ignore
import { InlineObject5 } from '../models';
// @ts-ignore
import { InlineObject6 } from '../models';
// @ts-ignore
import { InlineObject7 } from '../models';
// @ts-ignore
import { ProcedureAppInstanceDto } from '../models';
// @ts-ignore
import { ProcedureDto } from '../models';
// @ts-ignore
import { UserDto } from '../models';
/**
 * CsvReaderControllerApi - axios parameter creator
 * @export
 */
export const CsvReaderControllerApiAxiosParamCreator = function (
	configuration?: Configuration
) {
	return {
		/**
		 *
		 * @param {InlineObject7} inlineObject7
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addApplicationDetailsFromCSV: async (
			inlineObject7: InlineObject7,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'inlineObject7' is not null or undefined
			assertParamExists('addApplicationDetailsFromCSV', 'inlineObject7', inlineObject7);
			const localVarPath = `/api/importcsv/applicationsDetInfo`;
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
				inlineObject7,
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
		 * @param {InlineObject6} inlineObject6
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addApplicationFromCSV: async (
			inlineObject6: InlineObject6,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'inlineObject6' is not null or undefined
			assertParamExists('addApplicationFromCSV', 'inlineObject6', inlineObject6);
			const localVarPath = `/api/importcsv/applications`;
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
				inlineObject6,
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
		 * @param {InlineObject5} inlineObject5
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addProcedureAppInstancesFromCSV: async (
			inlineObject5: InlineObject5,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'inlineObject5' is not null or undefined
			assertParamExists(
				'addProcedureAppInstancesFromCSV',
				'inlineObject5',
				inlineObject5
			);
			const localVarPath = `/api/importcsv/procedureAppInstances`;
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
				inlineObject5,
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
		 * @param {InlineObject4} inlineObject4
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addProceduresFromCSV: async (
			inlineObject4: InlineObject4,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'inlineObject4' is not null or undefined
			assertParamExists('addProceduresFromCSV', 'inlineObject4', inlineObject4);
			const localVarPath = `/api/importcsv/procedures`;
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
				inlineObject4,
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
		 * @param {InlineObject3} inlineObject3
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addUsersFromCSV: async (
			inlineObject3: InlineObject3,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'inlineObject3' is not null or undefined
			assertParamExists('addUsersFromCSV', 'inlineObject3', inlineObject3);
			const localVarPath = `/api/importcsv/users`;
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
				inlineObject3,
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
 * CsvReaderControllerApi - functional programming interface
 * @export
 */
export const CsvReaderControllerApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator =
		CsvReaderControllerApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @param {InlineObject7} inlineObject7
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async addApplicationDetailsFromCSV(
			inlineObject7: InlineObject7,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ApplicationDto>>
		> {
			const localVarAxiosArgs =
				await localVarAxiosParamCreator.addApplicationDetailsFromCSV(
					inlineObject7,
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
		 * @param {InlineObject6} inlineObject6
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async addApplicationFromCSV(
			inlineObject6: InlineObject6,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ApplicationDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.addApplicationFromCSV(
				inlineObject6,
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
		 * @param {InlineObject5} inlineObject5
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async addProcedureAppInstancesFromCSV(
			inlineObject5: InlineObject5,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(
				axios?: AxiosInstance,
				basePath?: string
			) => AxiosPromise<Array<ProcedureAppInstanceDto>>
		> {
			const localVarAxiosArgs =
				await localVarAxiosParamCreator.addProcedureAppInstancesFromCSV(
					inlineObject5,
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
		 * @param {InlineObject4} inlineObject4
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async addProceduresFromCSV(
			inlineObject4: InlineObject4,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ProcedureDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.addProceduresFromCSV(
				inlineObject4,
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
		 * @param {InlineObject3} inlineObject3
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async addUsersFromCSV(
			inlineObject3: InlineObject3,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<UserDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.addUsersFromCSV(
				inlineObject3,
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
 * CsvReaderControllerApi - factory interface
 * @export
 */
export const CsvReaderControllerApiFactory = function (
	configuration?: Configuration,
	basePath?: string,
	axios?: AxiosInstance
) {
	const localVarFp = CsvReaderControllerApiFp(configuration);
	return {
		/**
		 *
		 * @param {InlineObject7} inlineObject7
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addApplicationDetailsFromCSV(
			inlineObject7: InlineObject7,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<ApplicationDto>> {
			return localVarFp
				.addApplicationDetailsFromCSV(inlineObject7, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {InlineObject6} inlineObject6
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addApplicationFromCSV(
			inlineObject6: InlineObject6,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<ApplicationDto>> {
			return localVarFp
				.addApplicationFromCSV(inlineObject6, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {InlineObject5} inlineObject5
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addProcedureAppInstancesFromCSV(
			inlineObject5: InlineObject5,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<ProcedureAppInstanceDto>> {
			return localVarFp
				.addProcedureAppInstancesFromCSV(inlineObject5, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {InlineObject4} inlineObject4
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addProceduresFromCSV(
			inlineObject4: InlineObject4,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<ProcedureDto>> {
			return localVarFp
				.addProceduresFromCSV(inlineObject4, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {InlineObject3} inlineObject3
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		addUsersFromCSV(
			inlineObject3: InlineObject3,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<UserDto>> {
			return localVarFp
				.addUsersFromCSV(inlineObject3, acceptLanguage, options)
				.then(request => request(axios, basePath));
		}
	};
};

/**
 * Request parameters for addApplicationDetailsFromCSV operation in CsvReaderControllerApi.
 * @export
 * @interface CsvReaderControllerApiAddApplicationDetailsFromCSVRequest
 */
export interface CsvReaderControllerApiAddApplicationDetailsFromCSVRequest {
	/**
	 *
	 * @type {InlineObject7}
	 * @memberof CsvReaderControllerApiAddApplicationDetailsFromCSV
	 */
	readonly inlineObject7: InlineObject7;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof CsvReaderControllerApiAddApplicationDetailsFromCSV
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for addApplicationFromCSV operation in CsvReaderControllerApi.
 * @export
 * @interface CsvReaderControllerApiAddApplicationFromCSVRequest
 */
export interface CsvReaderControllerApiAddApplicationFromCSVRequest {
	/**
	 *
	 * @type {InlineObject6}
	 * @memberof CsvReaderControllerApiAddApplicationFromCSV
	 */
	readonly inlineObject6: InlineObject6;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof CsvReaderControllerApiAddApplicationFromCSV
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for addProcedureAppInstancesFromCSV operation in CsvReaderControllerApi.
 * @export
 * @interface CsvReaderControllerApiAddProcedureAppInstancesFromCSVRequest
 */
export interface CsvReaderControllerApiAddProcedureAppInstancesFromCSVRequest {
	/**
	 *
	 * @type {InlineObject5}
	 * @memberof CsvReaderControllerApiAddProcedureAppInstancesFromCSV
	 */
	readonly inlineObject5: InlineObject5;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof CsvReaderControllerApiAddProcedureAppInstancesFromCSV
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for addProceduresFromCSV operation in CsvReaderControllerApi.
 * @export
 * @interface CsvReaderControllerApiAddProceduresFromCSVRequest
 */
export interface CsvReaderControllerApiAddProceduresFromCSVRequest {
	/**
	 *
	 * @type {InlineObject4}
	 * @memberof CsvReaderControllerApiAddProceduresFromCSV
	 */
	readonly inlineObject4: InlineObject4;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof CsvReaderControllerApiAddProceduresFromCSV
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for addUsersFromCSV operation in CsvReaderControllerApi.
 * @export
 * @interface CsvReaderControllerApiAddUsersFromCSVRequest
 */
export interface CsvReaderControllerApiAddUsersFromCSVRequest {
	/**
	 *
	 * @type {InlineObject3}
	 * @memberof CsvReaderControllerApiAddUsersFromCSV
	 */
	readonly inlineObject3: InlineObject3;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof CsvReaderControllerApiAddUsersFromCSV
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * CsvReaderControllerApi - object-oriented interface
 * @export
 * @class CsvReaderControllerApi
 * @extends {BaseAPI}
 */
export class CsvReaderControllerApi extends BaseAPI {
	/**
	 *
	 * @param {CsvReaderControllerApiAddApplicationDetailsFromCSVRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CsvReaderControllerApi
	 */
	public addApplicationDetailsFromCSV(
		requestParameters: CsvReaderControllerApiAddApplicationDetailsFromCSVRequest,
		options?: AxiosRequestConfig
	) {
		return CsvReaderControllerApiFp(this.configuration)
			.addApplicationDetailsFromCSV(
				requestParameters.inlineObject7,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {CsvReaderControllerApiAddApplicationFromCSVRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CsvReaderControllerApi
	 */
	public addApplicationFromCSV(
		requestParameters: CsvReaderControllerApiAddApplicationFromCSVRequest,
		options?: AxiosRequestConfig
	) {
		return CsvReaderControllerApiFp(this.configuration)
			.addApplicationFromCSV(
				requestParameters.inlineObject6,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {CsvReaderControllerApiAddProcedureAppInstancesFromCSVRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CsvReaderControllerApi
	 */
	public addProcedureAppInstancesFromCSV(
		requestParameters: CsvReaderControllerApiAddProcedureAppInstancesFromCSVRequest,
		options?: AxiosRequestConfig
	) {
		return CsvReaderControllerApiFp(this.configuration)
			.addProcedureAppInstancesFromCSV(
				requestParameters.inlineObject5,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {CsvReaderControllerApiAddProceduresFromCSVRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CsvReaderControllerApi
	 */
	public addProceduresFromCSV(
		requestParameters: CsvReaderControllerApiAddProceduresFromCSVRequest,
		options?: AxiosRequestConfig
	) {
		return CsvReaderControllerApiFp(this.configuration)
			.addProceduresFromCSV(
				requestParameters.inlineObject4,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {CsvReaderControllerApiAddUsersFromCSVRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CsvReaderControllerApi
	 */
	public addUsersFromCSV(
		requestParameters: CsvReaderControllerApiAddUsersFromCSVRequest,
		options?: AxiosRequestConfig
	) {
		return CsvReaderControllerApiFp(this.configuration)
			.addUsersFromCSV(
				requestParameters.inlineObject3,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}
}
