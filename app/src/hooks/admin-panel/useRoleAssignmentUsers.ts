import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';
import useUrlState from '@hooks/useUrlState';
import {
	filteredUsers,
	roleAssignmentFilters,
	usersList
} from '@store/admin-panel/roleAssignmentFilters';
import useGetUsers from '@api/user/useGetUsers';
import { UserDisplayRole } from '@model/UserRole';

const useRoleAssignmentUsers = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		role: string[];
		q: string | undefined;
	}>({
		role: [],
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(roleAssignmentFilters);
	const setUsers = useSetRecoilState(usersList);
	const { users, role } = useRecoilValue(filteredUsers);
	const { data: list } = useGetUsers();

	const toStartCase = (r: string) => {
		return r === 'USER_UNKNOWN'
			? 'Guest'
			: r
					.replace('_', ' ')
					.toLowerCase()
					.split(' ')
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ');
	};
	const data = useMemo(
		() =>
			list
				?.map(user =>
					user.roles.map(r => {
						return {
							id: user.id,
							username: user.username,
							name: user.name,
							surname: user.surname,
							email: user.email,
							displayName: user.displayName,
							roles: user.roles,
							principalRole: toStartCase(r.toString()) as UserDisplayRole
						};
					})
				)
				.flat(),
		[list]
	);
	useEffect(() => {
		data ? setUsers([...data.values()]) : null;
	}, [data, setUsers]);

	useEffect(() => {
		setFilters({
			role: urlFilters.role ?? [],
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		role
	};
	return { users, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useRoleAssignmentUsers;
