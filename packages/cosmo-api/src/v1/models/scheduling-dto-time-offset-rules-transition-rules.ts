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

import { LocalTime } from './local-time';

/**
 *
 * @export
 * @interface SchedulingDtoTimeOffsetRulesTransitionRules
 */
export interface SchedulingDtoTimeOffsetRulesTransitionRules {
	/**
	 *
	 * @type {string}
	 * @memberof SchedulingDtoTimeOffsetRulesTransitionRules
	 */
	month?: SchedulingDtoTimeOffsetRulesTransitionRulesMonthEnum;
	/**
	 *
	 * @type {string}
	 * @memberof SchedulingDtoTimeOffsetRulesTransitionRules
	 */
	timeDefinition?: SchedulingDtoTimeOffsetRulesTransitionRulesTimeDefinitionEnum;
	/**
	 *
	 * @type {string}
	 * @memberof SchedulingDtoTimeOffsetRulesTransitionRules
	 */
	dayOfWeek?: SchedulingDtoTimeOffsetRulesTransitionRulesDayOfWeekEnum;
	/**
	 *
	 * @type {number}
	 * @memberof SchedulingDtoTimeOffsetRulesTransitionRules
	 */
	dayOfMonthIndicator?: number;
	/**
	 *
	 * @type {LocalTime}
	 * @memberof SchedulingDtoTimeOffsetRulesTransitionRules
	 */
	localTime?: LocalTime;
	/**
	 *
	 * @type {boolean}
	 * @memberof SchedulingDtoTimeOffsetRulesTransitionRules
	 */
	midnightEndOfDay?: boolean;
}

export const SchedulingDtoTimeOffsetRulesTransitionRulesMonthEnum = {
	January: 'JANUARY',
	February: 'FEBRUARY',
	March: 'MARCH',
	April: 'APRIL',
	May: 'MAY',
	June: 'JUNE',
	July: 'JULY',
	August: 'AUGUST',
	September: 'SEPTEMBER',
	October: 'OCTOBER',
	November: 'NOVEMBER',
	December: 'DECEMBER'
} as const;

export type SchedulingDtoTimeOffsetRulesTransitionRulesMonthEnum =
	typeof SchedulingDtoTimeOffsetRulesTransitionRulesMonthEnum[keyof typeof SchedulingDtoTimeOffsetRulesTransitionRulesMonthEnum];
export const SchedulingDtoTimeOffsetRulesTransitionRulesTimeDefinitionEnum = {
	Utc: 'UTC',
	Wall: 'WALL',
	Standard: 'STANDARD'
} as const;

export type SchedulingDtoTimeOffsetRulesTransitionRulesTimeDefinitionEnum =
	typeof SchedulingDtoTimeOffsetRulesTransitionRulesTimeDefinitionEnum[keyof typeof SchedulingDtoTimeOffsetRulesTransitionRulesTimeDefinitionEnum];
export const SchedulingDtoTimeOffsetRulesTransitionRulesDayOfWeekEnum = {
	Monday: 'MONDAY',
	Tuesday: 'TUESDAY',
	Wednesday: 'WEDNESDAY',
	Thursday: 'THURSDAY',
	Friday: 'FRIDAY',
	Saturday: 'SATURDAY',
	Sunday: 'SUNDAY'
} as const;

export type SchedulingDtoTimeOffsetRulesTransitionRulesDayOfWeekEnum =
	typeof SchedulingDtoTimeOffsetRulesTransitionRulesDayOfWeekEnum[keyof typeof SchedulingDtoTimeOffsetRulesTransitionRulesDayOfWeekEnum];
