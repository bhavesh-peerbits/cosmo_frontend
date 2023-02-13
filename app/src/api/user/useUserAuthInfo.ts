import { useQuery } from '@tanstack/react-query';
import api from '@api/index';
import { fromUserApi } from '@model/common/User';

export async function getAuthInfo() {
	return api.userApi.getAuthInfo().then(({ data }) => fromUserApi(data));
}

export default () => useQuery(['autInfo'], () => getAuthInfo());
