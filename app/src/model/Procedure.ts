import { ProcedureApi } from 'cosmo-api/src';

interface Procedure {
	id: string;
	name: string;
	description?: string;
}

export const fromProcedureApi = (procedureApi: ProcedureApi): Procedure => {
	return {
		id: `${procedureApi.id}`,
		name: procedureApi.name,
		description: procedureApi.description
	};
};

export const toProcedureApi = (procedure: Procedure): ProcedureApi => {
	return {
		id: +procedure.id,
		name: procedure.name,
		description: procedure.description
	};
};

export default Procedure;
