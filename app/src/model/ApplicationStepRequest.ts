import { ApplicationStepRequestApi } from 'cosmo-api';
import Application, { fromApplicationApi } from './Application';
import EvidenceRequestStep, { fromEvidenceRequestStepApi } from './EvidenceRequestStep';

interface ApplicationStepRequest {
	application?: Application;
	steps?: EvidenceRequestStep[];
}

export const fromApplicationStepRequestApi = (
	applicationStepRequest: ApplicationStepRequestApi
): ApplicationStepRequest => {
	return {
		application: applicationStepRequest.application
			? fromApplicationApi(applicationStepRequest.application)
			: undefined,
		steps: applicationStepRequest.steps
			? [...applicationStepRequest.steps].map(step => fromEvidenceRequestStepApi(step))
			: []
	};
};

export default ApplicationStepRequest;
