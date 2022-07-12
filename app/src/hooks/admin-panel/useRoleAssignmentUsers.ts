import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import {
	filteredUsers,
	roleAssignmentFilters,
	usersList
} from '@store/admin-panel/roleAssignmentFilters';
import useGetUsers from '@api/user/useGetUsers';

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
	const { data = new Map() } = useGetUsers();

	useEffect(() => {
		setUsers([...data.values()]);
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
