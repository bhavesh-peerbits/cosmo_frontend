import { useRecoilValue } from 'recoil';
import authStore, {
	cleanSession,
	retrieveUserToken,
	setSession
} from '@store/auth/authStore';
import { getCookie, removeCookie, setCookie } from 'tiny-cookie';
import useLogin from '@api/user/useLogin';
import { useNavigate } from 'react-router-dom';

const NO_REDIRECT_PATHS = [
	'/',
	'/home',
	'/logout',
	'/404',
	'/unauthorized',
	'/forbidden',
	'/unauthorized'
];

interface LoginData {
	user: string;
	password: string;
	rememberMe: boolean;
}
const REDIRECT_PATH_COOKIE = 'postLoginRedirectPath';

const useAuthStore = () => {
	const auth = useRecoilValue(authStore);
	const loginApi = useLogin();
	const navigate = useNavigate();

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
		navigate(redirect ?? '/home', { replace: true });
	};

	const logout = (savePath = false) => {
		// if this logout was forced from an authenticated route then
		// save the current path, so we can go back there once signed in
		if (savePath) {
			const pathName = window.location.pathname;

			if (!NO_REDIRECT_PATHS.includes(pathName)) {
				setCookie(REDIRECT_PATH_COOKIE, pathName);
			}
		}

		cleanSession();
	};
	return {
		auth: {
			...auth,
			authenticated: Boolean(retrieveUserToken())
		},
		login,
		logout
	};
};

export default useAuthStore;
