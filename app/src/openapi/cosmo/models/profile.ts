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

/**
 *
 * @export
 * @interface Profile
 */
export interface Profile {
	/**
	 *
	 * @type {number}
	 * @memberof Profile
	 */
	id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Profile
	 */
	profileTypes?: ProfileProfileTypesEnum;
}

export const ProfileProfileTypesEnum = {
	SysAdmin: 'SYS_ADMIN',
	UserAdmin: 'USER_ADMIN',
	NarrativeAdmin: 'NARRATIVE_ADMIN',
	RevalidationAdmin: 'REVALIDATION_ADMIN',
	MonitoringAdmin: 'MONITORING_ADMIN',
	RequestAdmin: 'REQUEST_ADMIN',
	NarrativeAnalyst: 'NARRATIVE_ANALYST',
	MonitoringAnalyst: 'MONITORING_ANALYST',
	RevalidationAnalyst: 'REVALIDATION_ANALYST',
	RequestAnalyst: 'REQUEST_ANALYST',
	Reviewer: 'REVIEWER',
	ReviewerCollaborator: 'REVIEWER_COLLABORATOR'
} as const;

export type ProfileProfileTypesEnum =
	typeof ProfileProfileTypesEnum[keyof typeof ProfileProfileTypesEnum];
