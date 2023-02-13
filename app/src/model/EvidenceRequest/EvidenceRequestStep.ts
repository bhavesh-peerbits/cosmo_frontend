/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EvidenceRequestStepApi } from 'cosmo-api';
import FileLink, { fromFileLinkApi } from '../FileLink';
import User, { fromUserApi, toUserApi } from '../User';

export type StepInfoType = {
	publicComment: string | undefined;
	privateComment: string | undefined;
};

interface EvidenceRequestStep {
	approvers?: User[];
	reviewer?: User;
	type: 'REQUEST' | 'APPROVAL' | 'UPLOAD';
	delegates?: User[];
	text: string;
	stepInfo?: StepInfoType;
	completionDate?: Date;
	id: string;
	fileLinks: FileLink[];
	stepOrder: number;
	completionUser?: User;
	stepName?: string;
}

export const fromEvidenceRequestStepApi = (
	evidenceRequestStep: EvidenceRequestStepApi
): EvidenceRequestStep => {
	return {
		approvers: evidenceRequestStep.approvers
			? [...evidenceRequestStep.approvers].map(user => fromUserApi(user))
			: [],
		reviewer: evidenceRequestStep.reviewer
			? fromUserApi(evidenceRequestStep.reviewer)
			: undefined,
		type: evidenceRequestStep.type,
		delegates: evidenceRequestStep.delegates
			? [...evidenceRequestStep.delegates].map(user => fromUserApi(user))
			: [],
		text: evidenceRequestStep.text || '',
		completionDate: evidenceRequestStep.completionDate
			? new Date(evidenceRequestStep.completionDate)
			: undefined,
		id: `${evidenceRequestStep.id}`,
		stepInfo: (evidenceRequestStep.stepInfo as StepInfoType) || ({} as StepInfoType),
		fileLinks: evidenceRequestStep.fileLinks
			? [...evidenceRequestStep.fileLinks].map(fl => fromFileLinkApi(fl))
			: [],
		stepOrder: evidenceRequestStep.stepOrder,
		completionUser: evidenceRequestStep.completionUser
			? fromUserApi(evidenceRequestStep.completionUser)
			: undefined,
		stepName: evidenceRequestStep.stepName
	};
};

export const toEvidenceRequestStepApi = (
	evidenceRequestStep: EvidenceRequestStep
): EvidenceRequestStepApi => {
	return {
		id: +evidenceRequestStep.id,
		// @ts-ignore
		approvers: evidenceRequestStep.approvers?.map(user => toUserApi(user)),
		reviewer: evidenceRequestStep.reviewer
			? toUserApi(evidenceRequestStep.reviewer)
			: undefined,
		type: evidenceRequestStep.type,
		// @ts-ignore
		delegates: evidenceRequestStep.delegates
			? evidenceRequestStep.delegates.map(user => toUserApi(user))
			: undefined,
		stepOrder: evidenceRequestStep.stepOrder,
		stepInfo: evidenceRequestStep.stepInfo || {},
		completionDate: evidenceRequestStep.completionDate
			? evidenceRequestStep.completionDate.toISOString()
			: undefined,
		text: evidenceRequestStep.text || '',
		completionUser: evidenceRequestStep.completionUser
			? toUserApi(evidenceRequestStep.completionUser)
			: undefined,
		stepName: evidenceRequestStep.stepName,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		fileLinks: evidenceRequestStep.fileLinks
			? evidenceRequestStep.fileLinks.map(file => file)
			: undefined
	};
};

export default EvidenceRequestStep;
