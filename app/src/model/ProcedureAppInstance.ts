// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// TODO wait BE
import { ProcedureAppInstanceApi } from 'cosmo-api/src';
import User, { fromUserApi, toUserApi } from '@model/User';

interface ProcedureAppInstance {
	id: string;
	name: string;
	applicationId?: string;
	description?: string;
	procedureId: string;
	lastReview?: Date;
	lastModify?: Date;
	owner: User;
	delegated?: User[];
	lastReviewer?: User;
	lastModifier?: User;
	inReview?: boolean;
}

export const fromProcedureAppInstanceApi = (
	procedureApi: ProcedureAppInstanceApi
): ProcedureAppInstance => {
	return {
		id: `${procedureApi.id}`,
		name: procedureApi.name || '',
		applicationId: `${procedureApi.application.id}`,
		description: procedureApi.description,
		procedureId: `${procedureApi.procedure.id}`,
		delegated: procedureApi.delegatedProcedureApp.map(fromUserApi),
		lastModifier: procedureApi.lastModifier
			? fromUserApi(procedureApi.lastModifier)
			: undefined,
		lastModify: procedureApi.lastModify ? new Date(procedureApi.lastModify) : undefined,
		lastReview: procedureApi.lastReview ? new Date(procedureApi.lastReview) : undefined,
		lastReviewer: procedureApi.lastReviewer
			? fromUserApi(procedureApi.lastReviewer)
			: undefined,
		owner: fromUserApi(procedureApi.owner),
		inReview: procedureApi.inReview
	};
};

export const toProcedureAppInstanceApi = (
	procedure: ProcedureAppInstance
): ProcedureAppInstanceApi => {
	return {
		id: +procedure.id,
		name: procedure.name || '',
		procedure: {
			id: +procedure.procedureId
		},
		description: procedure.description,
		delegatedProcedureApp: procedure.delegated?.map(toUserApi) || [],
		lastModifier: toUserApi(procedure.lastModifier),
		lastModify: procedure.lastModify?.toISOString(),
		lastReview: procedure.lastReview?.toISOString(),
		lastReviewer: toUserApi(procedure.lastReviewer),
		owner: toUserApi(procedure.owner),
		inReview: procedure.inReview
	};
};

export default ProcedureAppInstance;
