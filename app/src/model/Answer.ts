import { AnswerDtoAnswerTypeEnum, User } from 'cosmo-api/src/v1';

interface Answer {
	id?: string;
	jsonApplicationData?: string;
	revalidationUser?: User;
	userToRevalidate?: string;
	userDetails?: string;
	permissions?: string;
	permissionDescription?: string;
	firefighterID?: number;
	answerType?: AnswerDtoAnswerTypeEnum;
	note?: string;
	delegated?: Array<User>;
}
export default Answer;
