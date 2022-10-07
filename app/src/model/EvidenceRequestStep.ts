import { User } from '@sentry/react';
import { EvidenceRequestStepApi } from 'cosmo-api';
import { fromUserApi } from './User';

interface EvidenceRequestStep {
	id?: string;
	approver?: User[];
	reviewer?: User;
	type?: 'REQUEST' | 'APPROVAL' | 'UPLOAD';
	delegates?: User[];
}

export const fromEvidenceRequestStepApi = (
	evidenceRequestStep: EvidenceRequestStepApi
): EvidenceRequestStep => {
	return {
		id: `${evidenceRequestStep.id}`,
		approver: evidenceRequestStep.approver
			? [...evidenceRequestStep.approver].map(user => fromUserApi(user))
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
