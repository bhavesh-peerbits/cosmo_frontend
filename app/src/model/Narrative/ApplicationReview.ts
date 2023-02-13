import User, { fromUserApi } from '@model/common/User';
import { UserApi } from 'cosmo-api/src';

interface ApplicationReview {
	id: string;
	appName: string;
	procedure: string;
	owner: User;
	expireDate?: Date;
	status: string;
}

export const fromApplicationReviewApi = (
	apiApplicationReview: Record<string, string>
): ApplicationReview => {
	return {
		id: apiApplicationReview.id,
		appName: apiApplicationReview.appName,
		procedure: apiApplicationReview.procedure,
		owner: fromUserApi(apiApplicationReview.owner as unknown as UserApi),
		expireDate: new Date(apiApplicationReview.expireDate),
		status: apiApplicationReview.status
	};
};

export default ApplicationReview;
