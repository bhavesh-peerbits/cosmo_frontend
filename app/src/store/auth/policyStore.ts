import { selector } from 'recoil';
import authStore from '@store/auth/authStore';
import { UserRoleEnum } from '@model/UserRole';

type Policies = {
	hasNoRole: boolean;
	canSeeNarrativeManagement: boolean;
	canReviewNarrative: boolean;
	canReview: boolean;
	canAdmin: boolean;
	canUserAdmin: boolean;
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
					(policies?.includes(UserRoleEnum.NarrativeAnalyst) ||
						policies?.includes(UserRoleEnum.NarrativeAdmin))
			),
			canReviewNarrative: Boolean(
				!hasNoRole &&
					(policies?.includes(UserRoleEnum.NarrativeAnalyst) ||
						policies?.includes(UserRoleEnum.NarrativeAdmin))
			),
			canReview: Boolean(
				!hasNoRole &&
					(policies?.includes(UserRoleEnum.Reviewer) ||
						policies?.includes(UserRoleEnum.ReviewerCollaborator))
			),
			canAdmin: Boolean(
				!hasNoRole &&
					(policies?.includes(UserRoleEnum.UserAdmin) ||
						policies?.includes(UserRoleEnum.SysAdmin) ||
						policies?.includes(UserRoleEnum.NarrativeAdmin))
			),
			canUserAdmin: Boolean(
				!hasNoRole &&
					(policies?.includes(UserRoleEnum.UserAdmin) ||
						policies?.includes(UserRoleEnum.SysAdmin))
			)
		};
	}
});

export default policyStore;
