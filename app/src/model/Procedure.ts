import { ProcedureApi } from 'cosmo-api/src';

interface Procedure {
	id: number;
	name: string;
	description?: string;
}

export const fromProcedureApi = (procedureApi: ProcedureApi): Procedure => {
	return {
		id: procedureApi.id,
		name: procedureApi.name,
		description: procedureApi.description
	};
};

export default Procedure;
