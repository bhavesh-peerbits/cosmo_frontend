import { EvidenceRequestDraftApi } from 'cosmo-api';
import User, { fromUserApi } from './User';
import ApplicationStepRequest, {
	fromApplicationStepRequestApi
} from './ApplicationStepRequest';

interface EvidenceRequestDraft {
	id: string;
	creator?: User;
	requests?: ApplicationStepRequest[];
	suggestedText?: string;
	collaborators?: User[];
	workflowType?: string;
	type?: string;
	name?: string;
	stepInfo?: { publicComment: string; privateComment: string };
}

export const fromEvidenceRequestDraftApi = (
	evidenceRequestDraft: EvidenceRequestDraftApi
): EvidenceRequestDraft => {
	return {
		id: `${evidenceRequestDraft.id}`,
		creator: evidenceRequestDraft.creator
			? fromUserApi(evidenceRequestDraft.creator)
			: undefined,
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
		name: evidenceRequestDraft.name,
		stepInfo: evidenceRequestDraft.stepInfo
			? JSON.parse(evidenceRequestDraft.stepInfo)
			: undefined
	};
};

export default EvidenceRequestDraft;
