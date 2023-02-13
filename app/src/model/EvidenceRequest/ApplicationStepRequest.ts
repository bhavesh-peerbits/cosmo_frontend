import { ApplicationStepRequestApi } from 'cosmo-api';
import Application, {
	fromApplicationApi,
	toApplicationApi
} from '../Narrative/Application';
import Association, { fromAssociationApi, toAssociationApi } from './Association';
import EvidenceRequestStep, {
	fromEvidenceRequestStepApi,
	toEvidenceRequestStepApi
} from './EvidenceRequestStep';

interface ApplicationStepRequest {
	id: string;
	application: Application;
	steps: EvidenceRequestStep[];
	associations?: Association[];
	selected: boolean;
}

export const fromApplicationStepRequestApi = (
	applicationStepRequestApi: ApplicationStepRequestApi
): ApplicationStepRequest => {
	return {
		id: `${applicationStepRequestApi.id}`,
		application: fromApplicationApi(applicationStepRequestApi.application),
		associations: applicationStepRequestApi.associations
			? applicationStepRequestApi.associations.map(asso => fromAssociationApi(asso))
			: undefined,
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
		associations: applicationStepRequest.associations
			? applicationStepRequest.associations.map(asso => toAssociationApi(asso))
			: undefined,
		application: toApplicationApi(applicationStepRequest.application),
		steps: applicationStepRequest.steps?.map(step => toEvidenceRequestStepApi(step)),
		selected: applicationStepRequest.selected
	};
};

export default ApplicationStepRequest;
