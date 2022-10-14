import { EvidenceRequestStepApi, UserApi } from 'cosmo-api';
import FileLink, { fromFileLinkApi } from './FileLink';
import User, { fromUserApi, toUserApi } from './User';

interface EvidenceRequestStep {
	approvers?: User[];
	reviewer?: User;
	type: 'REQUEST' | 'APPROVAL' | 'UPLOAD';
	delegates?: User[];
	text: string;
	stepInfo?: string;
	completionDate?: Date;
	id: string;
	fileLinks: FileLink[];
	stepOrder: number;
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
		stepInfo: evidenceRequestStep.stepInfo || '',
		fileLinks: evidenceRequestStep.fileLinks
			? [...evidenceRequestStep.fileLinks].map(fl => fromFileLinkApi(fl))
			: [],
		stepOrder: evidenceRequestStep.stepOrder
	};
};

export const toEvidenceRequestStepApi = (
	evidenceRequestStep: EvidenceRequestStep
): EvidenceRequestStepApi => {
	return {
		id: +evidenceRequestStep.id,
		approvers: new Set<UserApi>(
			evidenceRequestStep.approvers?.map(user => toUserApi(user))
		),
		reviewer: evidenceRequestStep.reviewer
			? toUserApi(evidenceRequestStep.reviewer)
			: undefined,
		type: evidenceRequestStep.type,

		delegates: evidenceRequestStep.delegates
			? new Set<UserApi>(evidenceRequestStep.delegates.map(user => toUserApi(user)))
			: undefined,
		stepOrder: evidenceRequestStep.stepOrder
	};
};

export default EvidenceRequestStep;
