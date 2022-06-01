import { ApplicationApi } from 'cosmo-api';
import { icons } from '@components/IconPicker';
import User, { fromUserApi, toUserApi } from '@model/User';

interface Application {
	id: string;
	name: string;
	codeName: string;
	description?: string;
	lastReview?: Date;
	lastModify?: Date;
	owner: User;
	delegates: User[];
	icon: keyof typeof icons;
	applicationData: Record<string, string | undefined> | undefined;
	dueDate?: Date;
	inReview?: boolean;
	hasProcedureInReview?: boolean;
	startNarrativeReview?: Date;
}

export const fromApplicationApi = (applicationApi: ApplicationApi): Application => ({
	id: `${applicationApi.id}`,
	codeName: applicationApi.codeName,
	name: applicationApi.name,
	description: applicationApi.description,
	lastReview: applicationApi.lastReview ? new Date(applicationApi.lastReview) : undefined,
	lastModify: applicationApi.lastModify ? new Date(applicationApi.lastModify) : undefined,
	owner: fromUserApi(applicationApi.owner),
	delegates: applicationApi.delegates?.map(fromUserApi) ?? [],
	icon: (applicationApi.icon as keyof typeof icons) || 'web',
	applicationData: applicationApi.applicationData,
	dueDate: applicationApi.endNarrativeReview
		? new Date(applicationApi.endNarrativeReview)
		: undefined,
	inReview: applicationApi.inReview,
	hasProcedureInReview: applicationApi.hasProcedureInReview,
	startNarrativeReview: applicationApi.startNarrativeReview
		? new Date(applicationApi.startNarrativeReview)
		: undefined
});

export const toApplicationApi = (application: Application): ApplicationApi => ({
	id: +application.id,
	name: application.name,
	codeName: application.codeName,
	description: application.description,
	lastReview: application.lastReview?.toISOString(),
	lastModify: application.lastModify?.toISOString(),
	owner: toUserApi(application.owner),
	delegates: application.delegates?.map(toUserApi),
	icon: application.icon,
	applicationData: application.applicationData,
	endNarrativeReview: application.dueDate?.toISOString(),
	inReview: application.inReview,
	hasProcedureInReview: application.hasProcedureInReview,
	startNarrativeReview: application.startNarrativeReview?.toISOString()
});

export default Application;
