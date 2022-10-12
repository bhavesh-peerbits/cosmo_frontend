import { EvidenceRequestStepApi } from 'cosmo-api';
import UserBase, { fromUserBaseApi } from './UserBase';

interface EvidenceRequestStep {
	approvers?: UserBase[];
	reviewer?: UserBase;
	type?: 'REQUEST' | 'APPROVAL' | 'UPLOAD';
	delegates?: UserBase[];
	text: string;
	stepInfo?: string;
	completionDate?: Date;
	id: string;
}

export const fromEvidenceRequestStepApi = (
	evidenceRequestStep: EvidenceRequestStepApi
): EvidenceRequestStep => {
	return {
		approvers: evidenceRequestStep.approvers
			? [...evidenceRequestStep.approvers].map(user => fromUserBaseApi(user))
			: [],
		reviewer: evidenceRequestStep.reviewer
			? fromUserBaseApi(evidenceRequestStep.reviewer)
			: undefined,
		type: evidenceRequestStep.type,
		delegates: evidenceRequestStep.delegates
			? [...evidenceRequestStep.delegates].map(user => fromUserBaseApi(user))
			: [],
		text: evidenceRequestStep.text || '',
		completionDate: evidenceRequestStep.completionDate
			? new Date(evidenceRequestStep.completionDate)
			: undefined,
		id: `${evidenceRequestStep.id}`,
		stepInfo: evidenceRequestStep.stepInfo || ''
	};
};

export default EvidenceRequestStep;
