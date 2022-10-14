import { ApplicationStepRequestApi } from 'cosmo-api';
import Application, { fromApplicationApi, toApplicationApi } from './Application';
import EvidenceRequestStep, {
	fromEvidenceRequestStepApi,
	toEvidenceRequestStepApi
} from './EvidenceRequestStep';

interface ApplicationStepRequest {
	id: string;
	application: Application;
	steps: EvidenceRequestStep[];
	selected: boolean;
}

export const fromApplicationStepRequestApi = (
	applicationStepRequestApi: ApplicationStepRequestApi
): ApplicationStepRequest => {
	return {
		id: `${applicationStepRequestApi.id}`,
		application: fromApplicationApi(applicationStepRequestApi.application),
		steps: applicationStepRequestApi.steps
			? [...applicationStepRequestApi.steps].map(step => fromEvidenceRequestStepApi(step))
			: [],
		selected: applicationStepRequestApi.selected
	};
};

export const toApplicationStepRequestApi = (
	applicationStepRequest: ApplicationStepRequest
): ApplicationStepRequestApi => {
	return {
		id: +applicationStepRequest.id,
		application: toApplicationApi(applicationStepRequest.application),
		steps: applicationStepRequest.steps?.map(step => toEvidenceRequestStepApi(step)),
		selected: applicationStepRequest.selected
	};
};

export default ApplicationStepRequest;
