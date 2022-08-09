import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';
import useUrlState from '@hooks/useUrlState';
import {
	filteredUsers,
	roleAssignmentFilters,
	usersList
} from '@store/admin-panel/roleAssignmentFilters';
import useGetUsers from '@api/user/useGetUsers';
import { mapUserRoleToDisplayRole, UserDisplayRole } from '@model/UserRole';
import { UserDtoRolesEnum } from 'cosmo-api/src/v1/models';

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

	const data = useMemo(
		() =>
			list &&
			list
				?.map(user => {
					if (user.roles.length !== 0) {
						return user.roles.map(r => {
							return {
								id: user.id,
								username: user.username,
								name: user.name,
								surname: user.surname,
								email: user.email,
								displayName: user.displayName,
								roles: user.roles,
								principalRole: mapUserRoleToDisplayRole(
									r.toString() as UserDtoRolesEnum
								) as UserDisplayRole,
								inactive: user.inactive
							};
						});
					}
					return user;
				})
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
