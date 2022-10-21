import api from '@api';
import { useQuery } from 'react-query';
import { fromUserApi } from '@model/User';

export async function getUsersByRoles(role1: string, role2: string) {
	return api.userApi
		.getUsersByRoles({ role1, role2 })
		.then(({ data }) => [...data].map(fromUserApi));
}

export default (role1: string, role2: string) =>
	useQuery(['users', role1, role2], () => getUsersByRoles(role1, role2));
