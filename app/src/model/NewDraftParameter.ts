import { NewDraftParameterApi } from 'cosmo-api';
import { PhaseType } from 'cosmo-api/src/v1';

interface NewDraftParameter {
	workflowName: string[];
	requestType: string[];
	phaseType?: PhaseType[];
}

export const fromNewDraftParameterApi = (
	newDraftParameter: NewDraftParameterApi
): NewDraftParameter => {
	return {
		workflowName: newDraftParameter.workflowName ? newDraftParameter.workflowName : [],
		requestType: newDraftParameter.requestType ? newDraftParameter.requestType : [],
		phaseType: newDraftParameter.phaseType
	};
};

export default NewDraftParameter;
