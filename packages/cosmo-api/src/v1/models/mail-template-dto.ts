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
 * @interface MailTemplateDto
 */
export interface MailTemplateDto {
	/**
	 * Mail Template id
	 * @type {number}
	 * @memberof MailTemplateDto
	 */
	id: number;
	/**
	 * Name of the template
	 * @type {string}
	 * @memberof MailTemplateDto
	 */
	name: string;
	/**
	 * Subject of the mail
	 * @type {string}
	 * @memberof MailTemplateDto
	 */
	subject: string;
	/**
	 * Text of the mail
	 * @type {string}
	 * @memberof MailTemplateDto
	 */
	message: string;
	/**
	 * Type of the mail
	 * @type {string}
	 * @memberof MailTemplateDto
	 */
	type: MailTemplateDtoTypeEnum;
	/**
	 * Language of the mail
	 * @type {string}
	 * @memberof MailTemplateDto
	 */
	language: MailTemplateDtoLanguageEnum;
	/**
	 * Variables referenced in the mail template
	 * @type {string}
	 * @memberof MailTemplateDto
	 */
	variables?: string;
}

export const MailTemplateDtoTypeEnum = {
	Narrative: 'NARRATIVE',
	Revalidation: 'REVALIDATION'
} as const;

export type MailTemplateDtoTypeEnum =
	typeof MailTemplateDtoTypeEnum[keyof typeof MailTemplateDtoTypeEnum];
export const MailTemplateDtoLanguageEnum = {
	Ita: 'ITA',
	Eng: 'ENG',
	Fra: 'FRA'
} as const;

export type MailTemplateDtoLanguageEnum =
	typeof MailTemplateDtoLanguageEnum[keyof typeof MailTemplateDtoLanguageEnum];
