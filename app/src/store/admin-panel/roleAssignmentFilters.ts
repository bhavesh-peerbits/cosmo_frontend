/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import User from '@model/User';

type Filters = {
	role: string[] | undefined;
	query: string | undefined;
};

const roleAssignmentFilters = atom<Filters>({
	key: 'roleAssignmentFilters',
	default: {
		role: [],
		query: ''
	}
});

const usersList = atom<User[]>({
	key: 'users',
	default: []
});

const applyFilters = (
	users: GetRecoilType<typeof usersList>,
	filters: GetRecoilType<typeof roleAssignmentFilters>
) => {
	const filteredUsers = users
		// filter by query term string
		.filter(user =>
			filters.query
				? user.name
						?.toLowerCase()
						?.trim()
						?.includes(filters.query.toLowerCase().trim()) ||
				  user.surname
						?.toLowerCase()
						?.trim()
						?.includes(filters.query.toLowerCase().trim())
				: true
		);

	return (
		filteredUsers
			// filter by role
			.filter(user =>
				filters.role?.length
					? filters.role.some(
							role => user.principalRole?.toLowerCase() === role.toLowerCase()
					  )
					: true
			)
	);
};

const filteredUsers = selector({
	key: 'filteredUsers',
	get: ({ get }) => {
		const filters = get(roleAssignmentFilters);
		const users = get(usersList);
		return {
			users: applyFilters(users, filters),
			role: [
				...new Set(users.map(user => user.principalRole).filter(o => !!o) as string[])
			].map(role => ({
				role,
				enabled: filters.role?.includes(role ?? '')
			}))
		};
	}
});

export { roleAssignmentFilters, usersList, filteredUsers };
