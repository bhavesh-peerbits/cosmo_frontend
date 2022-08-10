import { ProcedureApi } from 'cosmo-api/src';

interface Procedure {
	id: string;
	name: string;
	description?: string;
	controlObjectives?: string[];
	majorProcedure?: string;
}

export const fromProcedureApi = (procedureApi: ProcedureApi): Procedure => {
	return {
		id: `${procedureApi.id}`,
		name: procedureApi.name,
		description: procedureApi.description ? procedureApi.description : undefined,
		controlObjectives: procedureApi.controlObjectives
			? Array.from(procedureApi.controlObjectives)
			: undefined,
		majorProcedure: procedureApi.majorProcedure ? procedureApi.majorProcedure : undefined
	};
};

export const toProcedureApi = (procedure: Procedure): ProcedureApi => {
	return {
		id: +procedure.id,
		name: procedure.name,
		description: procedure.description ? procedure.description : undefined,
		controlObjectives: procedure.controlObjectives
			? new Set(procedure.controlObjectives)
			: undefined,
		majorProcedure: procedure.majorProcedure ? procedure.majorProcedure : undefined
	};
};

export default Procedure;
