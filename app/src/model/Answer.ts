import { AnswerApi, AnswerApiTypeEnum } from 'cosmo-api';
import User, { fromUserApi } from '@model/User';

interface Answer {
	id: string;
	jsonApplicationData?: string;
	revalidationUser?: User;
	userToRevalidate?: string;
	userDetails?: string;
	permissions?: string;
	permissionDescription?: string;
	firefighterID?: number;
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
	delegated: answerApi.delegated ? answerApi.delegated.map(fromUserApi) : undefined
});

export default Answer;
