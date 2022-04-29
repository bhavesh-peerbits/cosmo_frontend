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
import { Application } from '../models';
// @ts-ignore
import { Tenant } from '../models';
// @ts-ignore
import { User } from '../models';
/**
 * TenantControllerApi - axios parameter creator
 * @export
 */
export const TenantControllerApiAxiosParamCreator = function (
	configuration?: Configuration
) {
	return {
		/**
		 *
		 * @param {Tenant} tenant
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		createTenant: async (
			tenant: Tenant,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'tenant' is not null or undefined
			assertParamExists('createTenant', 'tenant', tenant);
			const localVarPath = `/api/tenants`;
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
				tenant,
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
		 * @param {number} body
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		deleteTenant: async (
			body: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'body' is not null or undefined
			assertParamExists('deleteTenant', 'body', body);
			const localVarPath = `/api/tenants/{id}`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
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
				body,
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
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllTenants: async (
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			const localVarPath = `/api/tenants`;
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
		 * @param {number} tenantId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getTenantApplications: async (
			tenantId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'tenantId' is not null or undefined
			assertParamExists('getTenantApplications', 'tenantId', tenantId);
			const localVarPath = `/api/tenants/{tenantId}/applications`;
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

			if (tenantId !== undefined) {
				localVarQueryParameter['tenantId'] = tenantId;
			}

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
		 * @param {number} id
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getTenantById: async (
			id: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'id' is not null or undefined
			assertParamExists('getTenantById', 'id', id);
			const localVarPath = `/api/tenants/{id}`;
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
		 * @param {number} tenantId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getTenantUsers: async (
			tenantId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'tenantId' is not null or undefined
			assertParamExists('getTenantUsers', 'tenantId', tenantId);
			const localVarPath = `/api/tenants/{tenantId}/users`;
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

			if (tenantId !== undefined) {
				localVarQueryParameter['tenantId'] = tenantId;
			}

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
		 * @param {number} id
		 * @param {Tenant} tenant
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		modifyTenant: async (
			id: number,
			tenant: Tenant,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'id' is not null or undefined
			assertParamExists('modifyTenant', 'id', id);
			// verify required parameter 'tenant' is not null or undefined
			assertParamExists('modifyTenant', 'tenant', tenant);
			const localVarPath = `/api/tenants/{id}`;
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

			if (id !== undefined) {
				localVarQueryParameter['id'] = id;
			}

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
				tenant,
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
 * TenantControllerApi - functional programming interface
 * @export
 */
export const TenantControllerApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = TenantControllerApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @param {Tenant} tenant
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async createTenant(
			tenant: Tenant,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Tenant>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.createTenant(
				tenant,
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
		 * @param {number} body
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async deleteTenant(
			body: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.deleteTenant(
				body,
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
		async getAllTenants(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Tenant>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getAllTenants(
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
		 * @param {number} tenantId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getTenantApplications(
			tenantId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Application>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getTenantApplications(
				tenantId,
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
		 * @param {number} id
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getTenantById(
			id: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Tenant>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getTenantById(
				id,
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
		 * @param {number} tenantId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getTenantUsers(
			tenantId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<User>>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getTenantUsers(
				tenantId,
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
		 * @param {number} id
		 * @param {Tenant} tenant
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async modifyTenant(
			id: number,
			tenant: Tenant,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Tenant>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.modifyTenant(
				id,
				tenant,
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
 * TenantControllerApi - factory interface
 * @export
 */
export const TenantControllerApiFactory = function (
	configuration?: Configuration,
	basePath?: string,
	axios?: AxiosInstance
) {
	const localVarFp = TenantControllerApiFp(configuration);
	return {
		/**
		 *
		 * @param {Tenant} tenant
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		createTenant(
			tenant: Tenant,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Tenant> {
			return localVarFp
				.createTenant(tenant, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} body
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		deleteTenant(
			body: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<string> {
			return localVarFp
				.deleteTenant(body, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllTenants(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<Tenant>> {
			return localVarFp
				.getAllTenants(acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} tenantId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getTenantApplications(
			tenantId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<Application>> {
			return localVarFp
				.getTenantApplications(tenantId, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} id
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getTenantById(
			id: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Tenant> {
			return localVarFp
				.getTenantById(id, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} tenantId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getTenantUsers(
			tenantId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<User>> {
			return localVarFp
				.getTenantUsers(tenantId, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} id
		 * @param {Tenant} tenant
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		modifyTenant(
			id: number,
			tenant: Tenant,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Tenant> {
			return localVarFp
				.modifyTenant(id, tenant, acceptLanguage, options)
				.then(request => request(axios, basePath));
		}
	};
};

/**
 * Request parameters for createTenant operation in TenantControllerApi.
 * @export
 * @interface TenantControllerApiCreateTenantRequest
 */
export interface TenantControllerApiCreateTenantRequest {
	/**
	 *
	 * @type {Tenant}
	 * @memberof TenantControllerApiCreateTenant
	 */
	readonly tenant: Tenant;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof TenantControllerApiCreateTenant
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for deleteTenant operation in TenantControllerApi.
 * @export
 * @interface TenantControllerApiDeleteTenantRequest
 */
export interface TenantControllerApiDeleteTenantRequest {
	/**
	 *
	 * @type {number}
	 * @memberof TenantControllerApiDeleteTenant
	 */
	readonly body: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof TenantControllerApiDeleteTenant
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getAllTenants operation in TenantControllerApi.
 * @export
 * @interface TenantControllerApiGetAllTenantsRequest
 */
export interface TenantControllerApiGetAllTenantsRequest {
	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof TenantControllerApiGetAllTenants
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getTenantApplications operation in TenantControllerApi.
 * @export
 * @interface TenantControllerApiGetTenantApplicationsRequest
 */
export interface TenantControllerApiGetTenantApplicationsRequest {
	/**
	 *
	 * @type {number}
	 * @memberof TenantControllerApiGetTenantApplications
	 */
	readonly tenantId: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof TenantControllerApiGetTenantApplications
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getTenantById operation in TenantControllerApi.
 * @export
 * @interface TenantControllerApiGetTenantByIdRequest
 */
export interface TenantControllerApiGetTenantByIdRequest {
	/**
	 *
	 * @type {number}
	 * @memberof TenantControllerApiGetTenantById
	 */
	readonly id: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof TenantControllerApiGetTenantById
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getTenantUsers operation in TenantControllerApi.
 * @export
 * @interface TenantControllerApiGetTenantUsersRequest
 */
export interface TenantControllerApiGetTenantUsersRequest {
	/**
	 *
	 * @type {number}
	 * @memberof TenantControllerApiGetTenantUsers
	 */
	readonly tenantId: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof TenantControllerApiGetTenantUsers
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for modifyTenant operation in TenantControllerApi.
 * @export
 * @interface TenantControllerApiModifyTenantRequest
 */
export interface TenantControllerApiModifyTenantRequest {
	/**
	 *
	 * @type {number}
	 * @memberof TenantControllerApiModifyTenant
	 */
	readonly id: number;

	/**
	 *
	 * @type {Tenant}
	 * @memberof TenantControllerApiModifyTenant
	 */
	readonly tenant: Tenant;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof TenantControllerApiModifyTenant
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * TenantControllerApi - object-oriented interface
 * @export
 * @class TenantControllerApi
 * @extends {BaseAPI}
 */
export class TenantControllerApi extends BaseAPI {
	/**
	 *
	 * @param {TenantControllerApiCreateTenantRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TenantControllerApi
	 */
	public createTenant(
		requestParameters: TenantControllerApiCreateTenantRequest,
		options?: AxiosRequestConfig
	) {
		return TenantControllerApiFp(this.configuration)
			.createTenant(requestParameters.tenant, requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {TenantControllerApiDeleteTenantRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TenantControllerApi
	 */
	public deleteTenant(
		requestParameters: TenantControllerApiDeleteTenantRequest,
		options?: AxiosRequestConfig
	) {
		return TenantControllerApiFp(this.configuration)
			.deleteTenant(requestParameters.body, requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {TenantControllerApiGetAllTenantsRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TenantControllerApi
	 */
	public getAllTenants(
		requestParameters: TenantControllerApiGetAllTenantsRequest = {},
		options?: AxiosRequestConfig
	) {
		return TenantControllerApiFp(this.configuration)
			.getAllTenants(requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {TenantControllerApiGetTenantApplicationsRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TenantControllerApi
	 */
	public getTenantApplications(
		requestParameters: TenantControllerApiGetTenantApplicationsRequest,
		options?: AxiosRequestConfig
	) {
		return TenantControllerApiFp(this.configuration)
			.getTenantApplications(
				requestParameters.tenantId,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {TenantControllerApiGetTenantByIdRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TenantControllerApi
	 */
	public getTenantById(
		requestParameters: TenantControllerApiGetTenantByIdRequest,
		options?: AxiosRequestConfig
	) {
		return TenantControllerApiFp(this.configuration)
			.getTenantById(requestParameters.id, requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {TenantControllerApiGetTenantUsersRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TenantControllerApi
	 */
	public getTenantUsers(
		requestParameters: TenantControllerApiGetTenantUsersRequest,
		options?: AxiosRequestConfig
	) {
		return TenantControllerApiFp(this.configuration)
			.getTenantUsers(
				requestParameters.tenantId,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {TenantControllerApiModifyTenantRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TenantControllerApi
	 */
	public modifyTenant(
		requestParameters: TenantControllerApiModifyTenantRequest,
		options?: AxiosRequestConfig
	) {
		return TenantControllerApiFp(this.configuration)
			.modifyTenant(
				requestParameters.id,
				requestParameters.tenant,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}
}
