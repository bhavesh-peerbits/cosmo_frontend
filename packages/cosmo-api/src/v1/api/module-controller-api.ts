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
import { ConfigModule } from '../models';
// @ts-ignore
import { Module } from '../models';
/**
 * ModuleControllerApi - axios parameter creator
 * @export
 */
export const ModuleControllerApiAxiosParamCreator = function (
	configuration?: Configuration
) {
	return {
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllConfigElementsForModule: async (
			id: number,
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'id' is not null or undefined
			assertParamExists('getAllConfigElementsForModule', 'id', id);
			const localVarPath = `/api/module/{id}/configelements`;
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

			if (id !== undefined) {
				localVarQueryParameter['id'] = id;
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
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getModules: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
			const localVarPath = `/api/module`;
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
 * ModuleControllerApi - functional programming interface
 * @export
 */
export const ModuleControllerApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = ModuleControllerApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getAllConfigElementsForModule(
			id: number,
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ConfigModule>>
		> {
			const localVarAxiosArgs =
				await localVarAxiosParamCreator.getAllConfigElementsForModule(id, options);
			return createRequestFunction(
				localVarAxiosArgs,
				globalAxios,
				BASE_PATH,
				configuration
			);
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getModules(
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Module>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getModules(options);
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
 * ModuleControllerApi - factory interface
 * @export
 */
export const ModuleControllerApiFactory = function (
	configuration?: Configuration,
	basePath?: string,
	axios?: AxiosInstance
) {
	const localVarFp = ModuleControllerApiFp(configuration);
	return {
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllConfigElementsForModule(
			id: number,
			options?: any
		): AxiosPromise<Array<ConfigModule>> {
			return localVarFp
				.getAllConfigElementsForModule(id, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getModules(options?: any): AxiosPromise<Array<Module>> {
			return localVarFp.getModules(options).then(request => request(axios, basePath));
		}
	};
};

/**
 * Request parameters for getAllConfigElementsForModule operation in ModuleControllerApi.
 * @export
 * @interface ModuleControllerApiGetAllConfigElementsForModuleRequest
 */
export interface ModuleControllerApiGetAllConfigElementsForModuleRequest {
	/**
	 *
	 * @type {number}
	 * @memberof ModuleControllerApiGetAllConfigElementsForModule
	 */
	readonly id: number;
}

/**
 * ModuleControllerApi - object-oriented interface
 * @export
 * @class ModuleControllerApi
 * @extends {BaseAPI}
 */
export class ModuleControllerApi extends BaseAPI {
	/**
	 *
	 * @param {ModuleControllerApiGetAllConfigElementsForModuleRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ModuleControllerApi
	 */
	public getAllConfigElementsForModule(
		requestParameters: ModuleControllerApiGetAllConfigElementsForModuleRequest,
		options?: AxiosRequestConfig
	) {
		return ModuleControllerApiFp(this.configuration)
			.getAllConfigElementsForModule(requestParameters.id, options)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ModuleControllerApi
	 */
	public getModules(options?: AxiosRequestConfig) {
		return ModuleControllerApiFp(this.configuration)
			.getModules(options)
			.then(request => request(this.axios, this.basePath));
	}
}