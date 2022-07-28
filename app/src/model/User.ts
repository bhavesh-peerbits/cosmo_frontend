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
	email: string;
	displayName: string;
	roles: UserRole[];
	principalRole: UserDisplayRole;
	inactive: boolean;
}

export const fromUserApi = (userApi: UserApi): User => {
	return {
		id: userApi.id,
		username: userApi.username,
		name: userApi.name,
		email: userApi.email,
		surname: userApi.surname,
		roles: userApi.roles || [],
		principalRole:
			userApi.roles?.length === 0 ||
			(userApi.roles?.length === 1 && userApi.roles[0] === 'USER_UNKNOWN') ||
			(userApi &&
				userApi.roles &&
				userApi.roles?.length >= 1 &&
				userApi.roles?.[0] !== 'USER_UNKNOWN')
				? mapUserRoleToDisplayRole(userApi.roles?.[0] || UserRoleEnum.UserUnknown)
				: mapUserRoleToDisplayRole(userApi.roles?.[1] || UserRoleEnum.UserUnknown),

		displayName:
			!userApi.name && !userApi.surname
				? userApi.username
				: `${userApi.name || ''} ${userApi.surname || ''}`,
		inactive: userApi.inactive
	};
};
export const toUserApi = (user: User): UserApi => {
	return {
		id: user.id,
		username: user.username,
		name: user.name,
		email: user.email,
		surname: user.surname,
		inactive: user.inactive
	};
};

export default User;
