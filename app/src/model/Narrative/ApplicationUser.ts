import { ApplicationUserApi } from 'cosmo-api';
import User, { fromUserApi } from '../User';
import Application, { fromApplicationApi, toApplicationApi } from './Application';

interface ApplicationUser {
	application: Application;
	users?: User[];
}
export const fromApplicationUserApi = (
	applicationUserApi: ApplicationUserApi
): ApplicationUser => {
	return {
		application: fromApplicationApi(applicationUserApi.application),
		users: applicationUserApi.users?.map(fromUserApi)
	};
};
export const toApplicationUserApi = (
	applicationUser: ApplicationUser
): ApplicationUserApi => {
	return {
		application: toApplicationApi(applicationUser.application),
		users: applicationUser.users
	};
};

export default ApplicationUser;
