import { ProcedureApi } from 'cosmo-api/src';

interface Procedure {
	id: string;
	name: string;
	description?: string;
	controlObjectives?: string[];
	majorProcedure?: string;
	orderNumber?: number;
}

export const fromProcedureApi = (procedureApi: ProcedureApi): Procedure => {
	return {
		id: `${procedureApi.id}`,
		name: procedureApi.name,
		description: procedureApi.description ? procedureApi.description : undefined,
		controlObjectives: procedureApi.controlObjectives
			? Array.from(procedureApi.controlObjectives)
			: undefined,
		majorProcedure: procedureApi.majorProcedure ? procedureApi.majorProcedure : undefined,
		orderNumber: procedureApi.orderNumber
	};
};

export const toProcedureApi = (procedure: Procedure): ProcedureApi => {
	return {
		id: +procedure.id,
		name: procedure.name,
		description: procedure.description ? procedure.description : undefined,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		controlObjectives: procedure.controlObjectives,
		majorProcedure: procedure.majorProcedure ? procedure.majorProcedure : undefined,
		orderNumber: procedure.orderNumber
	};
};

export default Procedure;
