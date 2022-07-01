import api from '@api';
import { useQuery } from 'react-query';

export const logoutApi = (refreshToken: string | null) => {
	if (refreshToken != null) {
		return api.accessApi.logout({
			refreshToken
		});
	}
	return null;
};

const useLogout = (refreshToken: string) =>
	useQuery(['logout'], () => logoutApi(refreshToken));

export default useLogout;
