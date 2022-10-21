import { EvidenceRequestDraftApi } from 'cosmo-api';
import { PhaseTypeDto } from 'cosmo-api/src/v1/models/phase-type-dto';
import User, { fromUserApi, toUserApi } from './User';
import ApplicationStepRequest, {
	fromApplicationStepRequestApi,
	toApplicationStepRequestApi
} from './ApplicationStepRequest';
import Workflow, { fromWorkflowApi, toWorkflowApi } from './Workflow';

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
	type: string;
	name?: string;
	stepInfo?: { publicComment: string | undefined; privateComment: string | undefined };
	dueDate?: Date;
	phaseType?: PhaseTypeDto;
	workflow: Workflow;
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
		type: evidenceRequestDraftApi.type,
		name: evidenceRequestDraftApi.name,
		stepInfo: evidenceRequestDraftApi.stepInfo
			? (evidenceRequestDraftApi.stepInfo as StepInfoType)
			: ({} as StepInfoType),
		phaseType: evidenceRequestDraftApi.phaseType,
		workflow: fromWorkflowApi(evidenceRequestDraftApi.workflow)
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
		type: evidenceRequestDraft.type,
		name: evidenceRequestDraft.name,
		stepInfo: evidenceRequestDraft.stepInfo,
		dueDate: evidenceRequestDraft.dueDate
			? evidenceRequestDraft.dueDate?.toISOString()
			: undefined,
		phaseType: evidenceRequestDraft.phaseType,
		workflow: toWorkflowApi(evidenceRequestDraft.workflow)
	};
};

export default EvidenceRequestDraft;
