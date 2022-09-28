import { User } from '@sentry/react';
import { EvidenceRequestStepApi } from 'cosmo-api';
import { fromUserApi } from './User';

interface EvidenceRequestStep {
	approver?: User[];
	reviewer?: User;
	type?: 'REQUEST' | 'APPROVAL' | 'UPLOAD';
	delegates?: User[];
}

export const fromEvidenceRequestStepApi = (
	evidenceRequestStep: EvidenceRequestStepApi
): EvidenceRequestStep => {
	return {
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
