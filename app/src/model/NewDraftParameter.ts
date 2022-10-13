import { NewDraftApi } from 'cosmo-api';

interface NewDraftParameter {
	workflowName: string[];
	requestType: string[];
}

export const fromNewDraftParameterApi = (
	newDraftParameter: NewDraftApi
): NewDraftParameter => {
	return {
		workflowName: newDraftParameter.workflowName ? newDraftParameter.workflowName : [],
		requestType: newDraftParameter.requestType ? newDraftParameter.requestType : []
	};
};

export default NewDraftParameter;
