import { EvidenceRequestDraftApi } from 'cosmo-api';
import User, { fromUserApi } from './User';
import ApplicationStepRequest, {
	fromApplicationStepRequestApi
} from './ApplicationStepRequest';

interface EvidenceRequestDraft {
	id: string;
	requests?: ApplicationStepRequest[];
	text?: string;
	collaborators?: User[];
	workflowType?: string;
	type?: string;
	name?: string;
}

export const fromEvidenceRequestDraftApi = (
	evidenceRequestDraft: EvidenceRequestDraftApi
): EvidenceRequestDraft => {
	return {
		id: `${evidenceRequestDraft.id}`,
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
		text: evidenceRequestDraft.text || '',
		workflowType: evidenceRequestDraft.workflowType || '',
		type: evidenceRequestDraft.type,
		name: evidenceRequestDraft.name
	};
};

export default EvidenceRequestDraft;
