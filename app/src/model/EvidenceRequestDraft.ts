import { EvidenceRequestDraftApi } from 'cosmo-api';
import User, { fromUserApi, toUserApi } from './User';
import ApplicationStepRequest, {
	fromApplicationStepRequestApi,
	toApplicationStepRequestApi
} from './ApplicationStepRequest';

export type StepInfoType = {
	publicComment: string | undefined;
	privateComment: string | undefined;
};

interface EvidenceRequestDraft {
	id: string;
	creator: User;
	requests?: ApplicationStepRequest[];
	text?: string;
	collaborators?: User[];
	workflowType: string;
	type: string;
	name?: string;
	stepInfo?: { publicComment: string | undefined; privateComment: string | undefined };
	dueDate?: Date;
}

export const fromEvidenceRequestDraftApi = (
	evidenceRequestDraftApi: EvidenceRequestDraftApi
): EvidenceRequestDraft => {
	return {
		id: `${evidenceRequestDraftApi.id}`,
		creator: fromUserApi(evidenceRequestDraftApi.creator),
		requests: evidenceRequestDraftApi.requests
			? [...evidenceRequestDraftApi.requests].map(request =>
					fromApplicationStepRequestApi(request)
			  )
			: [],
		collaborators: evidenceRequestDraftApi.collaborators
			? [...evidenceRequestDraftApi.collaborators].map(collaborator =>
					fromUserApi(collaborator)
			  )
			: [],
		text: evidenceRequestDraftApi.text,
		workflowType: evidenceRequestDraftApi.workflowType,
		type: evidenceRequestDraftApi.type,
		name: evidenceRequestDraftApi.name,
		stepInfo: evidenceRequestDraftApi.stepInfo
			? (evidenceRequestDraftApi.stepInfo as StepInfoType)
			: ({} as StepInfoType)
	};
};

export const toEvidenceRequestDraftApi = (
	evidenceRequestDraft: EvidenceRequestDraft
): EvidenceRequestDraftApi => {
	return {
		id: +evidenceRequestDraft.id,
		creator: toUserApi(evidenceRequestDraft.creator),
		requests: evidenceRequestDraft.requests
			? [...evidenceRequestDraft.requests].map(request =>
					toApplicationStepRequestApi(request)
			  )
			: [],
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		collaborators: evidenceRequestDraft.collaborators
			? evidenceRequestDraft.collaborators.map(user => toUserApi(user))
			: undefined,
		text: evidenceRequestDraft.text,
		workflowType: evidenceRequestDraft.workflowType,
		type: evidenceRequestDraft.type,
		name: evidenceRequestDraft.name,
		stepInfo: evidenceRequestDraft.stepInfo,
		dueDate: evidenceRequestDraft.dueDate
			? evidenceRequestDraft.dueDate?.toISOString()
			: undefined
	};
};

export default EvidenceRequestDraft;
