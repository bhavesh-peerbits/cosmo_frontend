import { EvidenceRequestStepApi } from 'cosmo-api';
import User, { fromUserApi } from './User';

interface EvidenceRequestStep {
	id?: string;
	approvers?: User[];
	reviewer?: User;
	type?: 'REQUEST' | 'APPROVAL' | 'UPLOAD';
	delegates?: User[];
}

export const fromEvidenceRequestStepApi = (
	evidenceRequestStep: EvidenceRequestStepApi
): EvidenceRequestStep => {
	return {
		id: `${evidenceRequestStep.id}`,
		approvers: evidenceRequestStep.approvers
			? [...evidenceRequestStep.approvers].map(user => fromUserApi(user))
			: [],
		reviewer: evidenceRequestStep.reviewer
			? fromUserApi(evidenceRequestStep.reviewer)
			: undefined,
		type: evidenceRequestStep.type,
		delegates: evidenceRequestStep.delegates
			? [...evidenceRequestStep.delegates].map(user => fromUserApi(user))
			: []
	};
};

export default EvidenceRequestStep;
