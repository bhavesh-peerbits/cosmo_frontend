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

import { Association } from './association';
import { FrameworkTreeStatus } from './framework-tree-status';
import { Tenant } from './tenant';

/**
 *
 * @export
 * @interface FrameworkTree
 */
export interface FrameworkTree {
	/**
	 *
	 * @type {Tenant}
	 * @memberof FrameworkTree
	 */
	tenant?: Tenant;
	/**
	 *
	 * @type {FrameworkTreeStatus}
	 * @memberof FrameworkTree
	 */
	status?: FrameworkTreeStatus;
	/**
	 *
	 * @type {number}
	 * @memberof FrameworkTree
	 */
	id?: number;
	/**
	 *
	 * @type {number}
	 * @memberof FrameworkTree
	 */
	parentId?: number;
	/**
	 *
	 * @type {Array<Association>}
	 * @memberof FrameworkTree
	 */
	association?: Array<Association>;
	/**
	 *
	 * @type {string}
	 * @memberof FrameworkTree
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof FrameworkTree
	 */
	description?: string;
	/**
	 *
	 * @type {string}
	 * @memberof FrameworkTree
	 */
	code?: string;
	/**
	 *
	 * @type {string}
	 * @memberof FrameworkTree
	 */
	rootCode?: string;
}
