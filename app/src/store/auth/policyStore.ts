import { selector } from 'recoil';
import authStore from '@store/auth/authStore';
import { UserRoleEnum } from '@model/UserRole';

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
					policies?.includesMulti(UserRoleEnum.SysAdmin, UserRoleEnum.NarrativeAnalyst)
			),
			canReviewNarrative: Boolean(
				!hasNoRole &&
					policies?.includesMulti(UserRoleEnum.SysAdmin, UserRoleEnum.NarrativeAnalyst)
			),
			canReview: Boolean(
				!hasNoRole &&
					policies?.includesMulti(
						UserRoleEnum.SysAdmin,
						UserRoleEnum.Reviewer,
						UserRoleEnum.ReviewerCollaborator
					)
			)
		};
	}
});

export default policyStore;
