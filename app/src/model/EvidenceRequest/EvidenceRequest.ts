import { EvidenceRequestApi } from 'cosmo-api';
import Application, {
	fromApplicationApi,
	toApplicationApi
} from '../Narrative/Application';
import { EvidenceRequestStatus } from './EvidenceRequestStatus';
import EvidenceRequestStep, {
	fromEvidenceRequestStepApi,
	toEvidenceRequestStepApi
} from './EvidenceRequestStep';
import User, { fromUserApi, toUserApi } from '../User';

interface EvidenceRequest {
	id: string;
	name?: string;
	code: string;
	type?: string;
	application: Application;
	status: EvidenceRequestStatus;
	workflowName?: string;
	workflowType?: string;
	currentStep: number;
	completionDate?: Date;
	dueDate: Date;
	startDate?: Date;
	creator: User;
	steps: EvidenceRequestStep[];
	contributors: User[];
	phaseType?: string;
	stepBeforeReturn?: number;
	frameworkName?: string;
}

export const fromEvidenceRequestApi = (
	evidenceRequest: EvidenceRequestApi
): EvidenceRequest => {
	return {
		id: `${evidenceRequest.id}`,
		name: evidenceRequest.name,
		code: evidenceRequest.code || '',
		type: evidenceRequest.type,
		application: fromApplicationApi(evidenceRequest.application),
		status: evidenceRequest.status,
		workflowName: evidenceRequest.workflowName,
		workflowType: evidenceRequest.workflowType,
		currentStep: evidenceRequest.currentStep,
		dueDate: new Date(evidenceRequest.dueDate),
		startDate: evidenceRequest.startDate
			? new Date(evidenceRequest.startDate)
			: undefined,
		steps: evidenceRequest.steps
			? [...evidenceRequest.steps].map(step => fromEvidenceRequestStepApi(step))
			: [],
		contributors: evidenceRequest.contributors
			? [...evidenceRequest.contributors].map(contributor => fromUserApi(contributor))
			: [],
		creator: fromUserApi(evidenceRequest.creator),
		completionDate: evidenceRequest.completionDate
			? new Date(evidenceRequest.completionDate)
			: undefined,
		phaseType: evidenceRequest.phaseType,
		stepBeforeReturn: evidenceRequest.stepBeforeReturn,
		frameworkName: evidenceRequest.frameworkName
	};
};

export const toEvidenceRequestApi = (
	evidenceRequest: EvidenceRequest
): EvidenceRequestApi => {
	return {
		id: +evidenceRequest.id,
		name: evidenceRequest.name || '',
		code: evidenceRequest.code || '',
		type: evidenceRequest.type,
		application: toApplicationApi(evidenceRequest.application),
		status: evidenceRequest.status,
		workflowName: evidenceRequest.workflowName || '',
		workflowType: evidenceRequest.workflowType,
		currentStep: evidenceRequest.currentStep,
		dueDate: evidenceRequest.dueDate.toISOString(),
		startDate: evidenceRequest.startDate ? evidenceRequest.startDate.toISOString() : '',
		steps: evidenceRequest.steps
			? [...evidenceRequest.steps].map(step => toEvidenceRequestStepApi(step))
			: [],
		contributors: evidenceRequest.contributors
			? evidenceRequest.contributors.map(user => toUserApi(user))
			: undefined,
		creator: toUserApi(evidenceRequest.creator),
		completionDate: evidenceRequest.completionDate
			? evidenceRequest.completionDate.toISOString()
			: undefined,
		phaseType: evidenceRequest.phaseType,
		stepBeforeReturn: evidenceRequest.stepBeforeReturn,
		frameworkName: evidenceRequest.frameworkName
			? evidenceRequest.frameworkName
			: undefined
	};
};

export default EvidenceRequest;
