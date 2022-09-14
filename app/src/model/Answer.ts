import { AnswerApi, AnswerApiTypeEnum } from 'cosmo-api';
import User, { fromUserApi, toUserApi } from '@model/User';

interface Answer {
	id: string;
	jsonApplicationData?: string;
	revalidationUser?: User;
	userToRevalidate?: string;
	userDetails?: string;
	permissions?: string;
	permissionDescription?: string;
	firefighterID?: string;
	answerType?: AnswerApiTypeEnum;
	note?: string;
	delegated?: Array<User>;
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
	delegated: answerApi.delegated?.map(fromUserApi)
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
	delegated: answer.delegated?.map(toUserApi)
});

export default Answer;
