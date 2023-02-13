import { AnswerApi, AnswerApiTypeEnum } from 'cosmo-api';
import User, { fromUserApi, toUserApi } from '@model/User';

interface Answer {
	id: string;
	jsonApplicationData?: Record<string, string | undefined>;
	revalidationUser?: User;
	userToRevalidate?: string;
	userDetails?: string;
	permissions?: string;
	permissionDescription?: string;
	firefighterID?: string;
	answerType?: AnswerApiTypeEnum;
	note?: string;
	delegated?: Array<User>;
	givenBy?: User;
	givenAt?: Date;
}

export const fromAnswersApi = (answerApi: AnswerApi): Answer => ({
	id: `${answerApi.id}`,
	revalidationUser: answerApi.revalidationUser
		? fromUserApi(answerApi.revalidationUser)
		: undefined,
	userToRevalidate: answerApi.userToRevalidate,
	userDetails: answerApi.userDetails,
	permissions: answerApi.permissions,
	permissionDescription: answerApi.permissionDescription,
	firefighterID: answerApi.firefighterID,
	answerType: answerApi.answerType,
	note: answerApi.note,
	delegated: answerApi.delegated?.map(fromUserApi),
	jsonApplicationData: answerApi.jsonApplicationData
		? JSON.parse(answerApi.jsonApplicationData)
		: undefined,
	givenAt: answerApi.givenAt ? new Date(answerApi.givenAt) : undefined,
	givenBy: answerApi.givenBy ? fromUserApi(answerApi.givenBy) : undefined
});

export const toAnswersApi = (answer: Answer): AnswerApi => ({
	id: +answer.id,
	revalidationUser: answer.revalidationUser
		? toUserApi(answer.revalidationUser)
		: undefined,
	userToRevalidate: answer.userToRevalidate,
	userDetails: answer.userDetails,
	permissions: answer.permissions,
	permissionDescription: answer.permissionDescription,
	firefighterID: answer.firefighterID,
	answerType: answer.answerType,
	note: answer.note,
	jsonApplicationData: JSON.stringify(answer.jsonApplicationData),
	delegated: answer.delegated?.map(toUserApi),
	givenAt: answer.givenAt ? answer.givenAt.toISOString() : undefined,
	givenBy: answer.givenBy ? toUserApi(answer.givenBy) : undefined
});

export default Answer;
