import { useRecoilValue } from 'recoil';
import authStore, { retrieveUserToken, setSession } from '@store/auth/authStore';
import { getCookie, removeCookie } from 'tiny-cookie';
import useLogin from '@api/user/useLogin';

interface LoginData {
	user: string;
	password: string;
	rememberMe: boolean;
}
const REDIRECT_PATH_COOKIE = 'postLoginRedirectPath';

const useLoginStore = () => {
	const auth = useRecoilValue(authStore);
	const loginApi = useLogin();

	const login = async ({ user, password, rememberMe }: LoginData) => {
		const resp = await loginApi.mutateAsync({
			user,
			password,
			tenant: 'cosmo'
		});
		if (resp.accessToken) {
			setSession(resp.accessToken, resp.refreshToken ?? '', rememberMe);
		}
		const redirect = getCookie(REDIRECT_PATH_COOKIE);
		removeCookie(REDIRECT_PATH_COOKIE);
		window.location.href = redirect ?? '/home';
	};

	return {
		auth: {
			...auth,
			authenticated: Boolean(retrieveUserToken())
		},
		login
	};
};

export default useLoginStore;
