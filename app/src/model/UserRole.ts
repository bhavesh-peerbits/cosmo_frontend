import { UserDtoRolesEnum } from 'cosmo-api/src/v1';

export type UserRole = UserDtoRolesEnum;
export const UserRoleEnum = UserDtoRolesEnum;

export type UserDisplayRole = 'Admin' | 'UserAdmin' | 'Guest';

export const mapUserRoleToDisplayRole = (userRole: UserRole): UserDisplayRole => {
	switch (userRole) {
		case UserDtoRolesEnum.SysAdmin:
			return 'Admin';
		case UserDtoRolesEnum.UserAdmin:
			return 'UserAdmin';
		default:
			return 'Guest';
	}
};
