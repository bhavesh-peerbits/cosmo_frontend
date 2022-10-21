import { NewDraftParameterApi } from 'cosmo-api';
import PhaseType, { fromPhaseTypeApi } from './PhaseType';

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
		phaseType: newDraftParameter.phaseType?.map(fromPhaseTypeApi) ?? []
	};
};

export default NewDraftParameter;
