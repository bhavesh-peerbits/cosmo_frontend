import {
	mapUserRoleToDisplayRole,
	UserDisplayRole,
	UserRole,
	UserRoleEnum
} from '@model/UserRole';
import { UserBaseApi } from 'cosmo-api';

interface UserBase {
	username: string;
	name: string | undefined;
	surname: string | undefined;
	email: string;
	displayName: string;
	roles: UserRole[];
	principalRole: UserDisplayRole;
	inactive: boolean;
}

export const fromUserBaseApi = (userBaseApi: UserBaseApi): UserBase => {
	return {
		username: userBaseApi.username,
		name: userBaseApi.name,
		email: userBaseApi.email,
		surname: userBaseApi.surname,
		roles: userBaseApi.roles || [],
		principalRole: mapUserRoleToDisplayRole(
			userBaseApi.roles?.[0] || UserRoleEnum.UserUnknown
		),
		displayName:
			!userBaseApi.name && !userBaseApi.surname
				? userBaseApi.username
				: `${userBaseApi.name || ''} ${userBaseApi.surname || ''}`,
		inactive: userBaseApi.inactive
	};
};
export const toUserBaseApi = (userBase: UserBase): UserBaseApi => {
	return {
		username: userBase.username,
		name: userBase.name,
		email: userBase.email,
		surname: userBase.surname,
		roles: userBase.roles,
		inactive: userBase.inactive
	};
};

export default UserBase;
