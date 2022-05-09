import { ApplicationApi } from 'cosmo-api';
import { icons } from '@components/IconPicker';
import User, { fromUserApi, toUserApi } from '@model/User';

interface Application {
	id: string;
	name: string;
	description?: string;
	lastReview?: Date;
	lastModify?: Date;
	owner: User;
	delegates: User[];
	icon: keyof typeof icons;
	applicationData: Record<string, string | undefined> | undefined;
}

export const fromApplicationApi = (applicationApi: ApplicationApi): Application => ({
	id: `${applicationApi.id}`,
	name: applicationApi.name,
	description: applicationApi.description,
	lastReview: applicationApi.lastReview ? new Date(applicationApi.lastReview) : undefined,
	lastModify: applicationApi.lastModify ? new Date(applicationApi.lastModify) : undefined,
	owner: fromUserApi(applicationApi.owner),
	delegates: applicationApi.delegates?.map(fromUserApi) ?? [],
	icon: applicationApi.icon as keyof typeof icons,
	applicationData: applicationApi.applicationData
});

export const toApplicationApi = (application: Application): ApplicationApi => ({
	id: +application.id,
	name: application.name,
	description: application.description,
	lastReview: application.lastReview?.toISOString(),
	lastModify: application.lastModify?.toISOString(),
	owner: toUserApi(application.owner),
	delegates: application.delegates?.map(toUserApi),
	icon: application.icon,
	applicationData: application.applicationData
});

export default Application;
