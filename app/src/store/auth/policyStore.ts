import { selector } from 'recoil';
import authStore from '@store/auth/authStore';
import { UserRoleEnum } from '@model/UserRole';

type Policies = {
	canCreateReport: boolean;
};

const policyStore = selector<Policies>({
	key: 'policyStore',
	get: ({ get }) => {
		const { policies } = get(authStore) || {};
		return { canCreateReport: Boolean(policies?.includes(UserRoleEnum.SysAdmin)) };
	}
});

export default policyStore;
