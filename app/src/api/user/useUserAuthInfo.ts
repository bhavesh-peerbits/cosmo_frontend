import { useQuery } from 'react-query';
import api from '@api/index';

export async function getAuthInfo() {
	return (await api.userApi.getAuthInfo()).data;
}

export default () => useQuery(['autInfo'], () => getAuthInfo());
