import { EvidenceRequestApi } from 'cosmo-api';
import Application, { fromApplicationApi } from './Application';
import { EvidenceRequestStatus } from './EvidenceRequestStatus';
import EvidenceRequestStep, { fromEvidenceRequestStepApi } from './EvidenceRequestStep';
import UserBase, { fromUserBaseApi } from './UserBase';

interface EvidenceRequest {
	id: string;
	name?: string;
	code: string;
	type?: string;
	application?: Application;
	status?: EvidenceRequestStatus;
	workflowName?: string;
	workflowType?: string;
	currentStep: number;
	completionDate?: Date;
	dueDate: Date;
	startDate?: Date;
	creator: UserBase;
	steps: EvidenceRequestStep[];
	contributors: UserBase[];
}

export const fromEvidenceRequestApi = (
	evidenceRequest: EvidenceRequestApi
): EvidenceRequest => {
	return {
		id: `${evidenceRequest.id}`,
		name: evidenceRequest.name,
		code: evidenceRequest.code || '',
		type: evidenceRequest.type,
		application: evidenceRequest.application
			? fromApplicationApi(evidenceRequest.application)
			: undefined,
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
			? [...evidenceRequest.contributors].map(contributor => fromUserBaseApi(contributor))
			: [],
		creator: fromUserBaseApi(evidenceRequest.creator),
		completionDate: evidenceRequest.completionDate
			? new Date(evidenceRequest.completionDate)
			: undefined
	};
};

export default EvidenceRequest;
