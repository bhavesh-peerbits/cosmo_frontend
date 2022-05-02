import { ApplicationApi } from 'cosmo-api';
import { icons } from '@components/IconPicker';

interface Application {
	id: string;
	name: ApplicationApi['name'];
	description?: ApplicationApi['description'];
	code: string;
	lastReview?: Date;
	lastModify?: Date;
	owner: NonNullable<ApplicationApi['owner']>['name'];
	icon?: keyof typeof icons;
}

export const fromApplicationApi = (applicationApi: ApplicationApi): Application => ({
	id: `${applicationApi.id || 0}`,
	name: applicationApi.name,
	description: applicationApi.description,
	lastReview: applicationApi.lastReview ? new Date(applicationApi.lastReview) : undefined,
	lastModify: applicationApi.lastModify ? new Date(applicationApi.lastModify) : undefined,
	code: 'Code', // TODO
	owner: applicationApi.owner?.name,
	icon: applicationApi.icon as keyof typeof icons
});

export default Application;
