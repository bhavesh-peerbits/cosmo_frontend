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

import { SchedulingDtoTimeOffsetRulesTransitionRules } from './scheduling-dto-time-offset-rules-transition-rules';
import { SchedulingDtoTimeOffsetRulesTransitions } from './scheduling-dto-time-offset-rules-transitions';

/**
 *
 * @export
 * @interface SchedulingDtoTimeOffsetRules
 */
export interface SchedulingDtoTimeOffsetRules {
	/**
	 *
	 * @type {boolean}
	 * @memberof SchedulingDtoTimeOffsetRules
	 */
	fixedOffset?: boolean;
	/**
	 *
	 * @type {Array<SchedulingDtoTimeOffsetRulesTransitions>}
	 * @memberof SchedulingDtoTimeOffsetRules
	 */
	transitions?: Array<SchedulingDtoTimeOffsetRulesTransitions>;
	/**
	 *
	 * @type {Array<SchedulingDtoTimeOffsetRulesTransitionRules>}
	 * @memberof SchedulingDtoTimeOffsetRules
	 */
	transitionRules?: Array<SchedulingDtoTimeOffsetRulesTransitionRules>;
}
