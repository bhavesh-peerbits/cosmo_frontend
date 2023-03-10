import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromUserApi } from '@model/common/User';

export async function getUsers() {
	return api.userApi.getAllUsers().then(({ data }) => data.map(fromUserApi));
}

export default () => useQuery(['users'], () => getUsers());
