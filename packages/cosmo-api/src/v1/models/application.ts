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

import { ApplicationProfile } from './application-profile';
import { ProcedureAppInstance } from './procedure-app-instance';
import { Tenant } from './tenant';
import { User } from './user';

/**
 *
 * @export
 * @interface Application
 */
export interface Application {
	/**
	 *
	 * @type {number}
	 * @memberof Application
	 */
	id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	codeName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	description?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof Application
	 */
	inReview?: boolean;
	/**
	 *
	 * @type {boolean}
	 * @memberof Application
	 */
	allowModifyOwner?: boolean;
	/**
	 *
	 * @type {ApplicationProfile}
	 * @memberof Application
	 */
	applicationProfileType?: ApplicationProfile;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	icon?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	lastReview?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	lastModify?: string;
	/**
	 *
	 * @type {User}
	 * @memberof Application
	 */
	owner?: User;
	/**
	 *
	 * @type {Array<User>}
	 * @memberof Application
	 */
	delegated?: Array<User>;
	/**
	 *
	 * @type {User}
	 * @memberof Application
	 */
	creatorUser?: User;
	/**
	 *
	 * @type {User}
	 * @memberof Application
	 */
	lastReviewer?: User;
	/**
	 *
	 * @type {User}
	 * @memberof Application
	 */
	lastModifier?: User;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	creationDate?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	appReviewStartDate?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	appReviewEndDate?: string;
	/**
	 *
	 * @type {Tenant}
	 * @memberof Application
	 */
	tenant?: Tenant;
	/**
	 *
	 * @type {string}
	 * @memberof Application
	 */
	jsonApplicationData?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof Application
	 */
	disable?: boolean;
	/**
	 *
	 * @type {Array<ProcedureAppInstance>}
	 * @memberof Application
	 */
	procedures?: Array<ProcedureAppInstance>;
}
