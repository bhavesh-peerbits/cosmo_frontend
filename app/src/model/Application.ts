import { ApplicationApi } from 'cosmo-api';
import { icons } from '@components/IconPicker';

interface Application {
	id: string;
	name: ApplicationApi['name'];
	code: string;
	lastReview?: Date;
	lastModify?: Date;
	owner: NonNullable<ApplicationApi['owner']>['name'];
	icon: keyof typeof icons;
}

export const fromApplicationApi = (applicationApi: ApplicationApi): Application => ({
	id: `${applicationApi.id || 0}`,
	name: applicationApi.name,
	lastReview: applicationApi.lastReview ? new Date(applicationApi.lastReview) : undefined,
	lastModify: applicationApi.lastModify ? new Date(applicationApi.lastModify) : undefined,
	code: 'Code', // TODO
	owner: applicationApi.owner?.name,
	icon: 'mobile' // TODO
});

export default Application;
