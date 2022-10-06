import { UserDtoRolesEnum } from 'cosmo-api/src/v1';

export type UserRole = UserDtoRolesEnum;
export const UserRoleEnum = UserDtoRolesEnum;

export type UserDisplayRole =
	| 'System Admin'
	| 'User Admin'
	| 'Guest'
	| 'Focal Point'
	| 'Reviewer Collaborator'
	| 'Narrative Analyst'
	| 'Narrative Admin'
	| 'Revalidation Analyst'
	| 'Revalidation Admin'
	| 'Request Admin'
	| 'Request Analyst'
	| 'Workflow Approver';

export const mapUserRoleToDisplayRole = (userRole: UserRole): UserDisplayRole => {
	switch (userRole) {
		case UserDtoRolesEnum.SysAdmin:
			return 'System Admin';
		case UserDtoRolesEnum.UserAdmin:
			return 'User Admin';
		case UserDtoRolesEnum.NarrativeAdmin:
			return 'Narrative Admin';
		case UserDtoRolesEnum.NarrativeAnalyst:
			return 'Narrative Analyst';
		case UserDtoRolesEnum.RevalidationAnalyst:
			return 'Revalidation Analyst';
		case UserDtoRolesEnum.RevalidationAdmin:
			return 'Revalidation Admin';
		case UserDtoRolesEnum.FocalPoint:
			return 'Focal Point';
		case UserDtoRolesEnum.ReviewerCollaborator:
			return 'Reviewer Collaborator';
		case UserDtoRolesEnum.RequestAdmin:
			return 'Request Admin';
		case UserDtoRolesEnum.RequestAnalyst:
			return 'Request Analyst';
		case UserDtoRolesEnum.WorkflowApprover:
			return 'Workflow Approver';
		default:
			return 'Guest';
	}
};
