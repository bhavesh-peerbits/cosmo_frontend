import { EvidenceRequestApi } from 'cosmo-api';
import Application, { fromApplicationApi } from './Application';
import { EvidenceRequestStatus } from './EvidenceRequestStatus';
import EvidenceRequestStep, { fromEvidenceRequestStepApi } from './EvidenceRequestStep';
import User, { fromUserApi } from './User';

interface EvidenceRequest {
	id: string;
	name?: string;
	code?: string;
	type?: string;
	application?: Application;
	status?: EvidenceRequestStatus;
	workflowName?: string;
	workflowType?: string;
	currentStep?: number;
	dueDate?: Date;
	startDate?: Date;
	steps?: EvidenceRequestStep[];
	fileLinks?: string[];
	contributors?: User[];
}

export const fromEvidenceRequestApi = (
	evidenceRequest: EvidenceRequestApi
): EvidenceRequest => {
	return {
		id: `${evidenceRequest.id}`,
		name: evidenceRequest.name,
		code: evidenceRequest.code,
		type: evidenceRequest.type,
		application: evidenceRequest.application
			? fromApplicationApi(evidenceRequest.application)
			: undefined,
		status: evidenceRequest.status,
		workflowName: evidenceRequest.workflowName,
		workflowType: evidenceRequest.workflowType,
		currentStep: evidenceRequest.currentStep,
		dueDate: evidenceRequest.dueDate ? new Date(evidenceRequest.dueDate) : undefined,
		startDate: evidenceRequest.startDate
			? new Date(evidenceRequest.startDate)
			: undefined,
		steps: evidenceRequest.steps
			? [...evidenceRequest.steps].map(step => fromEvidenceRequestStepApi(step))
			: [],
		contributors: evidenceRequest.contributors
			? [...evidenceRequest.contributors].map(contributor => fromUserApi(contributor))
			: []
	};
};

export default EvidenceRequest;
