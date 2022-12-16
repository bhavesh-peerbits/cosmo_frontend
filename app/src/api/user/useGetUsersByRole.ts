import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromUserApi } from '@model/User';

export async function getUsersByRole(role: string) {
	return api.userApi.getUsersByRole({ role }).then(({ data }) => data.map(fromUserApi));
}

export default (role: string) => useQuery(['users', role], () => getUsersByRole(role));
