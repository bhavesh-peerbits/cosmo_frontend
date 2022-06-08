import { atom } from 'recoil';
import { getCookie, removeCookie, setCookie } from 'tiny-cookie';
import { getAuthInfo } from '@api/user/useUserAuthInfo';
import { UserRole } from '@model/UserRole';
import User from '@model/User';
import { logoutApp } from '@hooks/auth/useLogout';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

type AuthData = {
	user: User | null;
	policies: UserRole[] | null;
};

const retrieveUserToken = () => {
	return sessionStorage.getItem(ACCESS_TOKEN_KEY) || getCookie(ACCESS_TOKEN_KEY);
};
const retrieveRefreshToken = () => {
	return sessionStorage.getItem(REFRESH_TOKEN_KEY) || getCookie(REFRESH_TOKEN_KEY);
};

const setSession = (token: string, refreshToken: string, useCookie: boolean) => {
	if (useCookie) {
		setCookie(ACCESS_TOKEN_KEY, token, {
			path: '/',
			secure: true
		});
		setCookie(REFRESH_TOKEN_KEY, refreshToken, {
			path: '/',
			secure: true
		});
	} else {
		sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
		sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
	}
};

const cleanSession = () => {
	sessionStorage.removeItem(ACCESS_TOKEN_KEY);
	removeCookie(ACCESS_TOKEN_KEY);
	sessionStorage.removeItem(REFRESH_TOKEN_KEY);
	removeCookie(REFRESH_TOKEN_KEY);
};

const retrieveUserInfo = async () => {
	const token = retrieveUserToken();
	if (token) {
		try {
			const info = await getAuthInfo();
			return {
				user: info,
				policies: info.roles || []
			};
		} catch (e) {
			// const apiError = e as ApiError | undefined;
			// throw new ApiError(
			// 	apiError?.status ?? 500,
			// 	apiError?.message ?? 'Generic Error',
			// 	true
			// );
			logoutApp(true);
			window.location.replace('/');
		}
	}
	return undefined;
};

const authStore = atom<AuthData | undefined>({
	key: 'authStore',
	default: {
		user: null,
		policies: null
	},
	effects: [
		({ trigger, setSelf, onSet }) => {
			// Avoid expensive initialization
			if (trigger === 'get') {
				setSelf(retrieveUserInfo());
			}
			onSet((authInfo, old, isReset) => {
				if (isReset) {
					// remove authentication token itself
					cleanSession();
				}
			});
		}
	]
});

export { retrieveUserToken, retrieveRefreshToken, setSession, cleanSession };
export default authStore;
