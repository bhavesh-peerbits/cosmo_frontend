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

import { DocumentTemplateDto } from './document-template-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';

/**
 *
 * @export
 * @interface PageDocumentTemplateDto
 */
export interface PageDocumentTemplateDto {
	/**
	 *
	 * @type {number}
	 * @memberof PageDocumentTemplateDto
	 */
	totalPages?: number;
	/**
	 *
	 * @type {number}
	 * @memberof PageDocumentTemplateDto
	 */
	totalElements?: number;
	/**
	 *
	 * @type {number}
	 * @memberof PageDocumentTemplateDto
	 */
	size?: number;
	/**
	 *
	 * @type {Array<DocumentTemplateDto>}
	 * @memberof PageDocumentTemplateDto
	 */
	content?: Array<DocumentTemplateDto>;
	/**
	 *
	 * @type {number}
	 * @memberof PageDocumentTemplateDto
	 */
	number?: number;
	/**
	 *
	 * @type {SortObject}
	 * @memberof PageDocumentTemplateDto
	 */
	sort?: SortObject;
	/**
	 *
	 * @type {boolean}
	 * @memberof PageDocumentTemplateDto
	 */
	first?: boolean;
	/**
	 *
	 * @type {boolean}
	 * @memberof PageDocumentTemplateDto
	 */
	last?: boolean;
	/**
	 *
	 * @type {number}
	 * @memberof PageDocumentTemplateDto
	 */
	numberOfElements?: number;
	/**
	 *
	 * @type {PageableObject}
	 * @memberof PageDocumentTemplateDto
	 */
	pageable?: PageableObject;
	/**
	 *
	 * @type {boolean}
	 * @memberof PageDocumentTemplateDto
	 */
	empty?: boolean;
}
