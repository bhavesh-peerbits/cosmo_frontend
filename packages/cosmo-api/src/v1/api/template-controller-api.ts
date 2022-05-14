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
import { MailTemplateDto } from '../models';
/**
 * TemplateControllerApi - axios parameter creator
 * @export
 */
export const TemplateControllerApiAxiosParamCreator = function (
	configuration?: Configuration
) {
	return {
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllMailTemplates: async (
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			const localVarPath = `/api/templates`;
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
 * TemplateControllerApi - functional programming interface
 * @export
 */
export const TemplateControllerApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = TemplateControllerApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getAllMailTemplates(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MailTemplateDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getAllMailTemplates(
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
 * TemplateControllerApi - factory interface
 * @export
 */
export const TemplateControllerApiFactory = function (
	configuration?: Configuration,
	basePath?: string,
	axios?: AxiosInstance
) {
	const localVarFp = TemplateControllerApiFp(configuration);
	return {
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllMailTemplates(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<MailTemplateDto>> {
			return localVarFp
				.getAllMailTemplates(acceptLanguage, options)
				.then(request => request(axios, basePath));
		}
	};
};

/**
 * Request parameters for getAllMailTemplates operation in TemplateControllerApi.
 * @export
 * @interface TemplateControllerApiGetAllMailTemplatesRequest
 */
export interface TemplateControllerApiGetAllMailTemplatesRequest {
	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof TemplateControllerApiGetAllMailTemplates
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * TemplateControllerApi - object-oriented interface
 * @export
 * @class TemplateControllerApi
 * @extends {BaseAPI}
 */
export class TemplateControllerApi extends BaseAPI {
	/**
	 *
	 * @param {TemplateControllerApiGetAllMailTemplatesRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TemplateControllerApi
	 */
	public getAllMailTemplates(
		requestParameters: TemplateControllerApiGetAllMailTemplatesRequest = {},
		options?: AxiosRequestConfig
	) {
		return TemplateControllerApiFp(this.configuration)
			.getAllMailTemplates(requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}
}