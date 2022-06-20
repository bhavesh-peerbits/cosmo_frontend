// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// TODO wait BE
import { ProcedureAppInstanceApi } from 'cosmo-api/src';
import User, { fromUserApi, toUserApi } from '@model/User';
import formatIso from 'date-fns/formatISO';

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
	startNarrativeReview?: Date;
	endNarrativeReview?: Date;
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
		inReview: procedureApi.inReview,
		startNarrativeReview: procedureApi.startNarrativeReview
			? new Date(procedureApi.startNarrativeReview)
			: undefined,
		endNarrativeReview: procedureApi.endNarrativeReview
			? new Date(procedureApi.endNarrativeReview)
			: undefined
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
		lastModifier: procedure.lastModifier ? toUserApi(procedure.lastModifier) : undefined,
		lastModify: procedure.lastModify?.toISOString(),
		lastReview: procedure.lastReview?.toISOString(),
		lastReviewer: procedure.lastReview ? toUserApi(procedure.lastReviewer) : undefined,
		owner: toUserApi(procedure.owner),
		inReview: procedure.inReview,
		startNarrativeReview: procedure.startNarrativeReview
			? formatIso(procedure.startNarrativeReview, { representation: 'date' })
			: undefined,
		endNarrativeReview: procedure.endNarrativeReview
			? formatIso(procedure.endNarrativeReview, { representation: 'date' })
			: undefined
	};
};

export default ProcedureAppInstance;
