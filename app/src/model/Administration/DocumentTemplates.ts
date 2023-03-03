/* eslint-disable prettier/prettier */
import { DocumentTemplateApi } from 'cosmo-api';
import { StepsDto, ChapterDto } from 'cosmo-api/src/v1';

interface Templates {
	id: number;
	name: string;
	type?: string;
	noticeOfExpiration: number;
	allowChanges: boolean;
	freeTextEnabled?: boolean;
	freeTextRequired?: boolean;
	applicationEnabled?: boolean;
	applicationRequired?: boolean;
	steps: Array<StepsDto>;
	chapters: Array<ChapterDto>;
	approvalSteps?: number;
	totalChapters?: number;
	usages?: number;
	createdOn?: Date;
}

export const fromDocumentationTemplatesApi = (
	DocumentTemplates: DocumentTemplateApi
): Templates => ({
	id: DocumentTemplates.id,
	name: DocumentTemplates?.name,
	type: DocumentTemplates.type,
	noticeOfExpiration: DocumentTemplates?.noticeOfExpiration,
	allowChanges: DocumentTemplates?.allowChanges,
	freeTextEnabled: DocumentTemplates?.freeTextEnabled,
	freeTextRequired: DocumentTemplates?.freeTextRequired,
	applicationEnabled: DocumentTemplates?.applicationEnabled,
	applicationRequired: DocumentTemplates?.applicationRequired,
	steps: DocumentTemplates.steps,
	chapters: DocumentTemplates?.chapters,
	approvalSteps: DocumentTemplates?.approvalSteps,
	totalChapters: DocumentTemplates?.totalChapters,
	usages: DocumentTemplates?.usages,
	createdOn: DocumentTemplates?.createdOn
		? new Date(DocumentTemplates?.createdOn)
		: undefined
});

export const toDocumentationTemplatesApi = (
	DocumentTemplates: DocumentTemplateApi
): Templates => ({
	id: +DocumentTemplates.id,
	name: DocumentTemplates?.name,
	type: DocumentTemplates.type,
	noticeOfExpiration: DocumentTemplates?.noticeOfExpiration,
	allowChanges: DocumentTemplates?.allowChanges,
	freeTextEnabled: DocumentTemplates?.freeTextEnabled,
	freeTextRequired: DocumentTemplates?.freeTextRequired,
	applicationEnabled: DocumentTemplates?.applicationEnabled,
	applicationRequired: DocumentTemplates?.applicationRequired,
	steps: DocumentTemplates.steps,
	chapters: DocumentTemplates?.chapters,
	approvalSteps: DocumentTemplates?.approvalSteps,
	totalChapters: DocumentTemplates?.totalChapters,
	usages: DocumentTemplates?.usages,
	createdOn: DocumentTemplates?.createdOn
		? new Date(DocumentTemplates?.createdOn)
		: undefined
});

export default Templates;
