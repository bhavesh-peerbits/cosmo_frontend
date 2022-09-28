import { EvidenceRequestDraftApi } from 'cosmo-api';
import { DraftRequestType } from './DraftRequestType';
import User, { fromUserApi } from './User';
import ApplicationStepRequest, {
	fromApplicationStepRequestApi
} from './ApplicationStepRequest';

interface EvidenceRequestDraft {
	requests?: ApplicationStepRequest[];
	suggestedText?: string;
	collaborators?: User[];
	workflowType?: string;
	type?: DraftRequestType;
	name?: string;
}

export const fromEvidenceRequestDraftApi = (
	evidenceRequestDraft: EvidenceRequestDraftApi
): EvidenceRequestDraft => {
	return {
		requests: evidenceRequestDraft.requests
			? [...evidenceRequestDraft.requests].map(request =>
					fromApplicationStepRequestApi(request)
			  )
			: [],
		collaborators: evidenceRequestDraft.collaborators
			? [...evidenceRequestDraft.collaborators].map(collaborator =>
					fromUserApi(collaborator)
			  )
			: [],
		suggestedText: evidenceRequestDraft.suggestedText || '',
		workflowType: evidenceRequestDraft.workflowType || '',
		type: evidenceRequestDraft.type,
		name: evidenceRequestDraft.name
	};
};

export default EvidenceRequestDraft;
