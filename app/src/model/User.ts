import { UserApi } from 'cosmo-api/src';
import {
	mapUserRoleToDisplayRole,
	UserDisplayRole,
	UserRole,
	UserRoleEnum
} from '@model/UserRole';

interface User {
	id: string;
	username: string;
	name: string | undefined;
	surname: string | undefined;
	email: string | undefined;
	displayName: string;
	roles: UserRole[];
	principalRole: UserDisplayRole;
}

export const fromUserApi = (userApi: UserApi): User => {
	return {
		id: userApi.id,
		username: userApi.username,
		name: userApi.name,
		email: userApi.email,
		surname: userApi.surname,
		roles: userApi.roles || [],
		principalRole: mapUserRoleToDisplayRole(
			userApi.roles?.[0] || UserRoleEnum.UserUnknown
		),
		displayName:
			!userApi.name && !userApi.surname
				? userApi.username
				: `${userApi.name || ''} ${userApi.surname || ''}`
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