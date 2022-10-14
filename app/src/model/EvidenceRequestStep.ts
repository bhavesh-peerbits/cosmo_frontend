/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EvidenceRequestStepApi } from 'cosmo-api';
import { StepDtoTypeEnum } from 'cosmo-api/src/v1';
import User, { fromUserApi, toUserApi } from './User';

interface EvidenceRequestStep {
	id: string;
	approvers?: User[];
	reviewer?: User;
	type: StepDtoTypeEnum;
	delegates?: User[];
	stepOrder: number;
}

export const fromEvidenceRequestStepApi = (
	evidenceRequestStepApi: EvidenceRequestStepApi
): EvidenceRequestStep => {
	return {
		id: `${evidenceRequestStepApi.id}`,
		approvers: evidenceRequestStepApi.approvers
			? [...evidenceRequestStepApi.approvers].map(user => fromUserApi(user))
			: [],
		reviewer: evidenceRequestStepApi.reviewer
			? fromUserApi(evidenceRequestStepApi.reviewer)
			: undefined,
		type: evidenceRequestStepApi.type,
		delegates: evidenceRequestStepApi.delegates
			? [...evidenceRequestStepApi.delegates].map(user => fromUserApi(user))
			: [],
		stepOrder: evidenceRequestStepApi.stepOrder
	};
};

export const toEvidenceRequestStepApi = (
	evidenceRequestStep: EvidenceRequestStep
): EvidenceRequestStepApi => {
	return {
		id: +evidenceRequestStep.id,
		// @ts-ignore
		approvers: evidenceRequestStep.approvers?.map(user => toUserApi(user)),
		reviewer: evidenceRequestStep.reviewer
			? toUserApi(evidenceRequestStep.reviewer)
			: undefined,
		type: evidenceRequestStep.type,
		// @ts-ignore
		delegates: evidenceRequestStep.delegates.map(user => toUserApi(user)),
		stepOrder: evidenceRequestStep.stepOrder
	};
};

export default EvidenceRequestStep;
