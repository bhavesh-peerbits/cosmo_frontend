import { ApplicationStepRequestApi } from 'cosmo-api';
import Application, { fromApplicationApi } from './Application';
import EvidenceRequestStep, { fromEvidenceRequestStepApi } from './EvidenceRequestStep';

interface ApplicationStepRequest {
	id: string;
	application?: Application;
	steps?: EvidenceRequestStep[];
	selected?: boolean;
}

export const fromApplicationStepRequestApi = (
	applicationStepRequest: ApplicationStepRequestApi
): ApplicationStepRequest => {
	return {
		id: `${applicationStepRequest.id}`,
		application: applicationStepRequest.application
			? fromApplicationApi(applicationStepRequest.application)
			: undefined,
		steps: applicationStepRequest.steps
			? [...applicationStepRequest.steps].map(step => fromEvidenceRequestStepApi(step))
			: [],
		selected: applicationStepRequest.selected
	};
};

export default ApplicationStepRequest;
