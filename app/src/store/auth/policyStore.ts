import { selector } from 'recoil';
import authStore from '@store/auth/authStore';
import { UserRoleEnum } from '@model/UserRole';

type Policies = {
	hasNoRole: boolean;
	canSeeNarrativeManagement: boolean;
	canReviewNarrative: boolean;
	canReview: boolean;
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
				!hasNoRole && policies?.includes(UserRoleEnum.NarrativeAnalyst)
			),
			canReviewNarrative: Boolean(
				!hasNoRole && policies?.includes(UserRoleEnum.NarrativeAnalyst)
			),
			canReview: Boolean(
				!hasNoRole &&
					(policies?.includes(UserRoleEnum.Reviewer) ||
						policies?.includes(UserRoleEnum.ReviewerCollaborator))
			)
		};
	}
});

export default policyStore;
