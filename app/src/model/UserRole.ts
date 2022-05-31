import { UserDtoRolesEnum } from 'cosmo-api/src/v1';

export type UserRole = UserDtoRolesEnum;
export const UserRoleEnum = UserDtoRolesEnum;

export type UserDisplayRole =
	| 'Admin'
	| 'UserAdmin'
	| 'Guest'
	| 'Reviewer'
	| 'Reviewer Collaborator'
	| 'Narrative Analyst';

export const mapUserRoleToDisplayRole = (userRole: UserRole): UserDisplayRole => {
	switch (userRole) {
		case UserDtoRolesEnum.SysAdmin:
			return 'Admin';
		case UserDtoRolesEnum.UserAdmin:
			return 'UserAdmin';
		case UserDtoRolesEnum.NarrativeAnalyst:
			return 'Narrative Analyst';
		case UserDtoRolesEnum.Reviewer:
			return 'Reviewer';
		case UserDtoRolesEnum.ReviewerCollaborator:
			return 'Reviewer Collaborator';
		default:
			return 'Guest';
	}
};
