import { DraftApi } from 'cosmo-api';
import User, { fromUserApi } from './User';
import ApplicationStepRequest, {
	fromApplicationStepRequestApi
} from './ApplicationStepRequest';

interface EvidenceRequestDraft {
	id: string;
	creator: User;
	requests?: ApplicationStepRequest[];
	text?: string;
	collaborators?: User[];
	workflowType: string;
	type: string;
	name?: string;
	stepInfo?: { publicComment: string; privateComment: string };
	dueDate?: Date;
}

export const fromEvidenceRequestDraftApi = (
	evidenceRequestDraft: DraftApi
): EvidenceRequestDraft => {
	return {
		id: `${evidenceRequestDraft.id}`,
		creator: fromUserApi(evidenceRequestDraft.creator),
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
		text: evidenceRequestDraft.text,
		workflowType: evidenceRequestDraft.workflowType,
		type: evidenceRequestDraft.type,
		name: evidenceRequestDraft.name,
		stepInfo: evidenceRequestDraft.stepInfo
			? JSON.parse(evidenceRequestDraft.stepInfo)
			: undefined
	};
};

export default EvidenceRequestDraft;
