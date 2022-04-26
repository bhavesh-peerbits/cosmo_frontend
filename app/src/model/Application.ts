import { ApplicationApi } from 'cosmo-api';

interface Application {
	id: string;
	name: ApplicationApi['name'];
	category: string;
	code: string;
	owner: NonNullable<ApplicationApi['owner']>['name'];
	icon: string;
}

export const fromApplicationApi = (applicationApi: ApplicationApi): Application => ({
	id: `${applicationApi.id || 0}`,
	name: applicationApi.name,
	category: 'Category', // TODO
	code: 'Code', // TODO
	owner: applicationApi.owner?.name,
	icon: 'icon' // TODO
});

export default Application;
