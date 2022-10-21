import { WorkflowApi } from 'cosmo-api';

interface Workflow {
	id: string;
	name?: string;
	type?: string;
}

export const fromWorkflowApi = (workflowApi: WorkflowApi): Workflow => {
	return {
		id: `${workflowApi.id}`,
		name: workflowApi.name,
		type: workflowApi.type
	};
};

export const toWorkflowApi = (workflow: Workflow): WorkflowApi => {
	return {
		id: +workflow.id,
		name: workflow.name,
		type: workflow.type
	};
};

export default Workflow;
