import { ProcedureAppInstanceApi } from 'cosmo-api/src';
import Procedure, { fromProcedureApi, toProcedureApi } from '@model/Procedure';
import User, { fromUserApi, toUserApi } from '@model/User';

interface ProcedureAppInstance {
	id: string;
	name: string;
	description?: string;
	procedure: Procedure;
	lastReview?: Date;
	lastModify?: Date;
	owner: User;
	delegated?: User[];
	lastReviewer: User;
	lastModifier: User;
}

export const fromProcedureAppInstanceApi = (
	procedureApi: ProcedureAppInstanceApi
): ProcedureAppInstance => {
	return {
		id: `${procedureApi.id}`,
		name: procedureApi.name || '',
		description: procedureApi.description,
		procedure: fromProcedureApi(procedureApi.procedure),
		delegated: procedureApi.delegatedProcedureApp.map(fromUserApi),
		lastModifier: fromUserApi(procedureApi.lastModifier),
		lastModify: procedureApi.lastModify ? new Date(procedureApi.lastModify) : undefined,
		lastReview: procedureApi.lastReview ? new Date(procedureApi.lastReview) : undefined,
		lastReviewer: fromUserApi(procedureApi.lastReviewer),
		owner: fromUserApi(procedureApi.owner)
	};
};

export const toProcedureAppInstanceApi = (
	procedure: ProcedureAppInstance
): ProcedureAppInstanceApi => {
	return {
		id: +procedure.id,
		name: procedure.name || '',
		description: procedure.description,
		procedure: toProcedureApi(procedure.procedure),
		delegatedProcedureApp: procedure.delegated?.map(toUserApi) || [],
		lastModifier: toUserApi(procedure.lastModifier),
		lastModify: procedure.lastModify?.toISOString(),
		lastReview: procedure.lastReview?.toISOString(),
		lastReviewer: toUserApi(procedure.lastReviewer),
		owner: toUserApi(procedure.owner)
	};
};

export default ProcedureAppInstance;
