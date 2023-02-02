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

import { AssetDto } from './asset-dto';
import { DeltaAnswerDto } from './delta-answer-dto';

/**
 *
 * @export
 * @interface DeltaDto
 */
export interface DeltaDto {
	/**
	 *
	 * @type {number}
	 * @memberof DeltaDto
	 */
	id: number;
	/**
	 *
	 * @type {Array<DeltaAnswerDto>}
	 * @memberof DeltaDto
	 */
	deltaAnswers?: Array<DeltaAnswerDto>;
	/**
	 *
	 * @type {string}
	 * @memberof DeltaDto
	 */
	generatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof DeltaDto
	 */
	status: DeltaDtoStatusEnum;
	/**
	 *
	 * @type {AssetDto}
	 * @memberof DeltaDto
	 */
	asset: AssetDto;
}

export const DeltaDtoStatusEnum = {
	Finished: 'FINISHED',
	Unfinished: 'UNFINISHED'
} as const;

export type DeltaDtoStatusEnum =
	typeof DeltaDtoStatusEnum[keyof typeof DeltaDtoStatusEnum];