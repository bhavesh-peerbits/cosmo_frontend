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

import { Asset } from './asset';
import { DeltaAnswer } from './delta-answer';
import { Run } from './run';

/**
 *
 * @export
 * @interface Delta
 */
export interface Delta {
	/**
	 *
	 * @type {number}
	 * @memberof Delta
	 */
	id?: number;
	/**
	 *
	 * @type {Array<DeltaAnswer>}
	 * @memberof Delta
	 */
	deltaAnswers?: Array<DeltaAnswer>;
	/**
	 *
	 * @type {string}
	 * @memberof Delta
	 */
	generatedAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Delta
	 */
	status?: DeltaStatusEnum;
	/**
	 *
	 * @type {Asset}
	 * @memberof Delta
	 */
	asset?: Asset;
	/**
	 *
	 * @type {Run}
	 * @memberof Delta
	 */
	run?: Run;
}

export const DeltaStatusEnum = {
	Finished: 'FINISHED',
	Unfinished: 'UNFINISHED'
} as const;

export type DeltaStatusEnum = typeof DeltaStatusEnum[keyof typeof DeltaStatusEnum];
