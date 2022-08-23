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
import { AnswerDto } from '../models';
// @ts-ignore
import { ApiErrorResponse } from '../models';
// @ts-ignore
import { CampaignDto } from '../models';
// @ts-ignore
import { InlineObject } from '../models';
// @ts-ignore
import { ResponseDto } from '../models';
// @ts-ignore
import { ReviewDto } from '../models';
/**
 * ReviewerCampaignControllerApi - axios parameter creator
 * @export
 */
export const ReviewerCampaignControllerApiAxiosParamCreator = function (
	configuration?: Configuration
) {
	return {
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllCampaigns: async (
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			const localVarPath = `/api/reviewer/campaign/all`;
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
		 * @param {number} reviewId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAnswersForGivenReview: async (
			reviewId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'reviewId' is not null or undefined
			assertParamExists('getAnswersForGivenReview', 'reviewId', reviewId);
			const localVarPath = `/api/reviewer/campaign/answer/{reviewId}`.replace(
				`{${'reviewId'}}`,
				encodeURIComponent(String(reviewId))
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
		 * @param {number} campaignId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getApplicationsOfCampaign: async (
			campaignId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'campaignId' is not null or undefined
			assertParamExists('getApplicationsOfCampaign', 'campaignId', campaignId);
			const localVarPath = `/api/reviewer/campaign/{campaignId}/application`.replace(
				`{${'campaignId'}}`,
				encodeURIComponent(String(campaignId))
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
		 * @param {number} campaignId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getCampaignById: async (
			campaignId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'campaignId' is not null or undefined
			assertParamExists('getCampaignById', 'campaignId', campaignId);
			const localVarPath = `/api/reviewer/campaign/{campaignId}`.replace(
				`{${'campaignId'}}`,
				encodeURIComponent(String(campaignId))
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
		 * @param {string} campaignName
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getCampaignByName: async (
			campaignName: string,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'campaignName' is not null or undefined
			assertParamExists('getCampaignByName', 'campaignName', campaignName);
			const localVarPath = `/api/reviewer/campaign/name/{campaignName}`.replace(
				`{${'campaignName'}}`,
				encodeURIComponent(String(campaignName))
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
		 * @param {InlineObject} inlineObject
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		saveResponseToAllAnswers: async (
			inlineObject: InlineObject,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'inlineObject' is not null or undefined
			assertParamExists('saveResponseToAllAnswers', 'inlineObject', inlineObject);
			const localVarPath = `/api/reviewer/campaign/answer`;
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
				inlineObject,
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
		 * @param {number} answerID
		 * @param {ResponseDto} responseDto
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		saveResponseToGivenAnswer: async (
			answerID: number,
			responseDto: ResponseDto,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options: AxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'answerID' is not null or undefined
			assertParamExists('saveResponseToGivenAnswer', 'answerID', answerID);
			// verify required parameter 'responseDto' is not null or undefined
			assertParamExists('saveResponseToGivenAnswer', 'responseDto', responseDto);
			const localVarPath = `/api/reviewer/campaign/answer/{answerID}`.replace(
				`{${'answerID'}}`,
				encodeURIComponent(String(answerID))
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
				responseDto,
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
 * ReviewerCampaignControllerApi - functional programming interface
 * @export
 */
export const ReviewerCampaignControllerApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator =
		ReviewerCampaignControllerApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getAllCampaigns(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CampaignDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getAllCampaigns(
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
		 * @param {number} reviewId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getAnswersForGivenReview(
			reviewId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AnswerDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getAnswersForGivenReview(
				reviewId,
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
		 * @param {number} campaignId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getApplicationsOfCampaign(
			campaignId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<
			(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ReviewDto>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getApplicationsOfCampaign(
				campaignId,
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
		 * @param {number} campaignId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getCampaignById(
			campaignId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CampaignDto>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getCampaignById(
				campaignId,
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
		 * @param {string} campaignName
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getCampaignByName(
			campaignName: string,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CampaignDto>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getCampaignByName(
				campaignName,
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
		 * @param {InlineObject} inlineObject
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async saveResponseToAllAnswers(
			inlineObject: InlineObject,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.saveResponseToAllAnswers(
				inlineObject,
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
		 * @param {number} answerID
		 * @param {ResponseDto} responseDto
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async saveResponseToGivenAnswer(
			answerID: number,
			responseDto: ResponseDto,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: AxiosRequestConfig
		): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.saveResponseToGivenAnswer(
				answerID,
				responseDto,
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
 * ReviewerCampaignControllerApi - factory interface
 * @export
 */
export const ReviewerCampaignControllerApiFactory = function (
	configuration?: Configuration,
	basePath?: string,
	axios?: AxiosInstance
) {
	const localVarFp = ReviewerCampaignControllerApiFp(configuration);
	return {
		/**
		 *
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAllCampaigns(
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<CampaignDto>> {
			return localVarFp
				.getAllCampaigns(acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} reviewId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getAnswersForGivenReview(
			reviewId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<AnswerDto>> {
			return localVarFp
				.getAnswersForGivenReview(reviewId, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} campaignId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getApplicationsOfCampaign(
			campaignId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<Array<ReviewDto>> {
			return localVarFp
				.getApplicationsOfCampaign(campaignId, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} campaignId
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getCampaignById(
			campaignId: number,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<CampaignDto> {
			return localVarFp
				.getCampaignById(campaignId, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {string} campaignName
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getCampaignByName(
			campaignName: string,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<CampaignDto> {
			return localVarFp
				.getCampaignByName(campaignName, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {InlineObject} inlineObject
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		saveResponseToAllAnswers(
			inlineObject: InlineObject,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<void> {
			return localVarFp
				.saveResponseToAllAnswers(inlineObject, acceptLanguage, options)
				.then(request => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} answerID
		 * @param {ResponseDto} responseDto
		 * @param {'en-US' | 'it-IT' | 'fr-FR'} [acceptLanguage]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		saveResponseToGivenAnswer(
			answerID: number,
			responseDto: ResponseDto,
			acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR',
			options?: any
		): AxiosPromise<void> {
			return localVarFp
				.saveResponseToGivenAnswer(answerID, responseDto, acceptLanguage, options)
				.then(request => request(axios, basePath));
		}
	};
};

/**
 * Request parameters for getAllCampaigns operation in ReviewerCampaignControllerApi.
 * @export
 * @interface ReviewerCampaignControllerApiGetAllCampaignsRequest
 */
export interface ReviewerCampaignControllerApiGetAllCampaignsRequest {
	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof ReviewerCampaignControllerApiGetAllCampaigns
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getAnswersForGivenReview operation in ReviewerCampaignControllerApi.
 * @export
 * @interface ReviewerCampaignControllerApiGetAnswersForGivenReviewRequest
 */
export interface ReviewerCampaignControllerApiGetAnswersForGivenReviewRequest {
	/**
	 *
	 * @type {number}
	 * @memberof ReviewerCampaignControllerApiGetAnswersForGivenReview
	 */
	readonly reviewId: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof ReviewerCampaignControllerApiGetAnswersForGivenReview
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getApplicationsOfCampaign operation in ReviewerCampaignControllerApi.
 * @export
 * @interface ReviewerCampaignControllerApiGetApplicationsOfCampaignRequest
 */
export interface ReviewerCampaignControllerApiGetApplicationsOfCampaignRequest {
	/**
	 *
	 * @type {number}
	 * @memberof ReviewerCampaignControllerApiGetApplicationsOfCampaign
	 */
	readonly campaignId: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof ReviewerCampaignControllerApiGetApplicationsOfCampaign
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getCampaignById operation in ReviewerCampaignControllerApi.
 * @export
 * @interface ReviewerCampaignControllerApiGetCampaignByIdRequest
 */
export interface ReviewerCampaignControllerApiGetCampaignByIdRequest {
	/**
	 *
	 * @type {number}
	 * @memberof ReviewerCampaignControllerApiGetCampaignById
	 */
	readonly campaignId: number;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof ReviewerCampaignControllerApiGetCampaignById
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for getCampaignByName operation in ReviewerCampaignControllerApi.
 * @export
 * @interface ReviewerCampaignControllerApiGetCampaignByNameRequest
 */
export interface ReviewerCampaignControllerApiGetCampaignByNameRequest {
	/**
	 *
	 * @type {string}
	 * @memberof ReviewerCampaignControllerApiGetCampaignByName
	 */
	readonly campaignName: string;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof ReviewerCampaignControllerApiGetCampaignByName
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for saveResponseToAllAnswers operation in ReviewerCampaignControllerApi.
 * @export
 * @interface ReviewerCampaignControllerApiSaveResponseToAllAnswersRequest
 */
export interface ReviewerCampaignControllerApiSaveResponseToAllAnswersRequest {
	/**
	 *
	 * @type {InlineObject}
	 * @memberof ReviewerCampaignControllerApiSaveResponseToAllAnswers
	 */
	readonly inlineObject: InlineObject;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof ReviewerCampaignControllerApiSaveResponseToAllAnswers
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * Request parameters for saveResponseToGivenAnswer operation in ReviewerCampaignControllerApi.
 * @export
 * @interface ReviewerCampaignControllerApiSaveResponseToGivenAnswerRequest
 */
export interface ReviewerCampaignControllerApiSaveResponseToGivenAnswerRequest {
	/**
	 *
	 * @type {number}
	 * @memberof ReviewerCampaignControllerApiSaveResponseToGivenAnswer
	 */
	readonly answerID: number;

	/**
	 *
	 * @type {ResponseDto}
	 * @memberof ReviewerCampaignControllerApiSaveResponseToGivenAnswer
	 */
	readonly responseDto: ResponseDto;

	/**
	 *
	 * @type {'en-US' | 'it-IT' | 'fr-FR'}
	 * @memberof ReviewerCampaignControllerApiSaveResponseToGivenAnswer
	 */
	readonly acceptLanguage?: 'en-US' | 'it-IT' | 'fr-FR';
}

/**
 * ReviewerCampaignControllerApi - object-oriented interface
 * @export
 * @class ReviewerCampaignControllerApi
 * @extends {BaseAPI}
 */
export class ReviewerCampaignControllerApi extends BaseAPI {
	/**
	 *
	 * @param {ReviewerCampaignControllerApiGetAllCampaignsRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ReviewerCampaignControllerApi
	 */
	public getAllCampaigns(
		requestParameters: ReviewerCampaignControllerApiGetAllCampaignsRequest = {},
		options?: AxiosRequestConfig
	) {
		return ReviewerCampaignControllerApiFp(this.configuration)
			.getAllCampaigns(requestParameters.acceptLanguage, options)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {ReviewerCampaignControllerApiGetAnswersForGivenReviewRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ReviewerCampaignControllerApi
	 */
	public getAnswersForGivenReview(
		requestParameters: ReviewerCampaignControllerApiGetAnswersForGivenReviewRequest,
		options?: AxiosRequestConfig
	) {
		return ReviewerCampaignControllerApiFp(this.configuration)
			.getAnswersForGivenReview(
				requestParameters.reviewId,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {ReviewerCampaignControllerApiGetApplicationsOfCampaignRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ReviewerCampaignControllerApi
	 */
	public getApplicationsOfCampaign(
		requestParameters: ReviewerCampaignControllerApiGetApplicationsOfCampaignRequest,
		options?: AxiosRequestConfig
	) {
		return ReviewerCampaignControllerApiFp(this.configuration)
			.getApplicationsOfCampaign(
				requestParameters.campaignId,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {ReviewerCampaignControllerApiGetCampaignByIdRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ReviewerCampaignControllerApi
	 */
	public getCampaignById(
		requestParameters: ReviewerCampaignControllerApiGetCampaignByIdRequest,
		options?: AxiosRequestConfig
	) {
		return ReviewerCampaignControllerApiFp(this.configuration)
			.getCampaignById(
				requestParameters.campaignId,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {ReviewerCampaignControllerApiGetCampaignByNameRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ReviewerCampaignControllerApi
	 */
	public getCampaignByName(
		requestParameters: ReviewerCampaignControllerApiGetCampaignByNameRequest,
		options?: AxiosRequestConfig
	) {
		return ReviewerCampaignControllerApiFp(this.configuration)
			.getCampaignByName(
				requestParameters.campaignName,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {ReviewerCampaignControllerApiSaveResponseToAllAnswersRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ReviewerCampaignControllerApi
	 */
	public saveResponseToAllAnswers(
		requestParameters: ReviewerCampaignControllerApiSaveResponseToAllAnswersRequest,
		options?: AxiosRequestConfig
	) {
		return ReviewerCampaignControllerApiFp(this.configuration)
			.saveResponseToAllAnswers(
				requestParameters.inlineObject,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {ReviewerCampaignControllerApiSaveResponseToGivenAnswerRequest} requestParameters Request parameters.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ReviewerCampaignControllerApi
	 */
	public saveResponseToGivenAnswer(
		requestParameters: ReviewerCampaignControllerApiSaveResponseToGivenAnswerRequest,
		options?: AxiosRequestConfig
	) {
		return ReviewerCampaignControllerApiFp(this.configuration)
			.saveResponseToGivenAnswer(
				requestParameters.answerID,
				requestParameters.responseDto,
				requestParameters.acceptLanguage,
				options
			)
			.then(request => request(this.axios, this.basePath));
	}
}
