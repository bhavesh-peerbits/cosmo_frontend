import api from '@api';
import { fromApplicationUserApi } from '@model/ApplicationUser';
import { useQuery } from '@tanstack/react-query';

const useGetApplicationUser = (appId: string) => {
	return api.userAdminApi
		.getApplicationUser({ appId: +appId })
		.then(({ data }) => fromApplicationUserApi(data));
};

export default (appId: string) =>
	useQuery(['applicationUsers', appId], () => useGetApplicationUser(appId), {
		_defaulted: true
	});
