import { ProcedureApi } from 'cosmo-api/src';

interface Procedure {
	id: string;
	name: string;
	description?: string;
	controlObjectives?: Set<string>;
}

export const fromProcedureApi = (procedureApi: ProcedureApi): Procedure => {
	return {
		id: `${procedureApi.id}`,
		name: procedureApi.name,
		description: procedureApi.description,
		controlObjectives: procedureApi.controlObjectives
	};
};

export const toProcedureApi = (procedure: Procedure): ProcedureApi => {
	return {
		id: +procedure.id,
		name: procedure.name,
		description: procedure.description,
		controlObjectives: procedure.controlObjectives
	};
};

export default Procedure;
