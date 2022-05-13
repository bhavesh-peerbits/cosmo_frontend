import { ProcedureAppInstanceApi } from 'cosmo-api/src';
import Procedure, { fromProcedureApi } from '@model/Procedure';
import User, { fromUserApi } from '@model/User';

interface ProcedureAppInstance {
	id: number;
	name: string;
	description?: string;
	procedure: Procedure;
	lastReview?: Date;
	lastModify?: Date;
	owner?: User;
	delegated?: User[];
	lastReviewer?: User;
	lastModifier?: User;
}

export const fromProcedureAppInstanceApi = (
	procedureApi: ProcedureAppInstanceApi
): ProcedureAppInstance => {
	return {
		id: procedureApi.id,
		name: procedureApi.name || '',
		description: procedureApi.description,
		procedure: fromProcedureApi(procedureApi.procedure),
		delegated: [],
		lastModifier: procedureApi.lastModifier
			? fromUserApi(procedureApi.lastModifier)
			: undefined,
		lastModify: procedureApi.lastModify ? new Date(procedureApi.lastModify) : undefined,
		lastReview: procedureApi.lastReview ? new Date(procedureApi.lastReview) : undefined,
		lastReviewer: procedureApi.lastReviewer
			? fromUserApi(procedureApi.lastReviewer)
			: undefined,
		owner: procedureApi.owner ? fromUserApi(procedureApi.owner) : undefined
	};
};

export default ProcedureAppInstance;
