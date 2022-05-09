import { UserApi } from 'cosmo-api/src';

interface User {
	id: string;
	username: string;
	name: string | undefined;
	surname: string | undefined;
	email: string | undefined;
}

export const fromUserApi = (userApi: UserApi): User => {
	return {
		id: userApi.id,
		username: userApi.username,
		name: userApi.name,
		email: userApi.email,
		surname: userApi.surname
	};
};
export const toUserApi = (user: User): UserApi => {
	return {
		id: user.id,
		username: user.username,
		name: user.name,
		email: user.email,
		surname: user.surname
	};
};

export default User;
