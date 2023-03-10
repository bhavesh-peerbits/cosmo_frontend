import { selector } from 'recoil';
import authStore from '@store/auth/authStore';
import { UserRoleEnum } from '@model/common/UserRole';

declare global {
	interface Array<T> {
		includesMulti(...values: T[]): boolean;
	}
}
function multi<T>(this: T[], ...values: T[]) {
	return this.some(v => values.includes(v));
}
// eslint-disable-next-line no-extend-native
Array.prototype.includesMulti = multi;

type Policies = {
	hasNoRole: boolean;
	canSeeNarrativeManagement: boolean;
	canReviewNarrative: boolean;
	canReview: boolean;
	canAdmin: boolean;
	canUserAdmin: boolean;
	canNarrativeAdmin: boolean;
	canRevalidateUser: boolean;
	canReviewUser: boolean;
	canCreateRequest: boolean;
	canCreateMonitoring: boolean;
	canWorkflowApprover: boolean;
	canDocumentAdmin: boolean;
};

const policyStore = selector<Policies>({
	key: 'policyStore',
	get: ({ get }) => {
		const { policies } = get(authStore) || {};
		const hasNoRole = Boolean(
			(policies?.length ?? 0) === 0 || policies?.includes(UserRoleEnum.UserUnknown)
		);
		return {
			hasNoRole,
			canSeeNarrativeManagement: Boolean(
				!hasNoRole &&
					policies?.includesMulti(
						UserRoleEnum.SysAdmin,
						UserRoleEnum.NarrativeAnalyst,
						UserRoleEnum.NarrativeAdmin
					)
			),
			canReviewNarrative: Boolean(
				!hasNoRole &&
					policies?.includesMulti(
						UserRoleEnum.SysAdmin,
						UserRoleEnum.NarrativeAnalyst,
						UserRoleEnum.NarrativeAdmin
					)
			),
			canReview: Boolean(
				!hasNoRole &&
					policies?.includesMulti(
						UserRoleEnum.SysAdmin,
						UserRoleEnum.FocalPoint,
						UserRoleEnum.ReviewerCollaborator,
						UserRoleEnum.WorkflowApprover
					)
			),
			canAdmin: Boolean(
				!hasNoRole &&
					policies?.includesMulti(
						UserRoleEnum.SysAdmin,
						UserRoleEnum.UserAdmin,
						UserRoleEnum.NarrativeAdmin
						// UserRoleEnum.RevalidationAdmin // TODO remove comment when admin panel for revalidation is ready
					)
			),
			canUserAdmin: Boolean(
				!hasNoRole &&
					policies?.includesMulti(UserRoleEnum.SysAdmin, UserRoleEnum.UserAdmin)
			),
			canNarrativeAdmin: Boolean(
				!hasNoRole &&
					policies?.includesMulti(UserRoleEnum.SysAdmin, UserRoleEnum.NarrativeAdmin)
			),
			canRevalidateUser: Boolean(
				!hasNoRole &&
					policies?.includesMulti(
						UserRoleEnum.RevalidationAdmin,
						UserRoleEnum.RevalidationAnalyst,
						UserRoleEnum.SysAdmin
					)
			),
			canReviewUser: Boolean(
				!hasNoRole &&
					policies?.includesMulti(UserRoleEnum.FocalPoint, UserRoleEnum.SysAdmin)
			),
			canCreateRequest: Boolean(
				!hasNoRole &&
					policies?.includesMulti(
						UserRoleEnum.RequestAdmin,
						UserRoleEnum.RequestAnalyst,
						UserRoleEnum.SysAdmin
					)
			),
			canCreateMonitoring: Boolean(
				!hasNoRole &&
					policies?.includesMulti(
						UserRoleEnum.MonitoringAdmin,
						UserRoleEnum.MonitoringAnalyst,
						UserRoleEnum.SysAdmin
					)
			),
			canWorkflowApprover: Boolean(
				!hasNoRole &&
					policies?.includesMulti(UserRoleEnum.WorkflowApprover, UserRoleEnum.SysAdmin)
			),
			canDocumentAdmin: Boolean(
				!hasNoRole &&
					policies?.includesMulti(UserRoleEnum.DocumentationAdmin, UserRoleEnum.SysAdmin)
			)
		};
	}
});

export default policyStore;
