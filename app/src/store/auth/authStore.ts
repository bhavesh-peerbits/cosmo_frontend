import { atom } from 'recoil';
import { getCookie, removeCookie, setCookie } from 'tiny-cookie';
import { getAuthInfo } from '@api/user/useUserAuthInfo';
import { UserRole } from '@api';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

type User = {
	username: string;
	name?: string;
	surname?: string;
	email?: string;
};

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
			path: '/'
		});
		setCookie(REFRESH_TOKEN_KEY, refreshToken, {
			path: '/'
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
				user: {
					username: info.username,
					name: info.name,
					surname: info.surname,
					email: info.email
				},
				policies: info.roles || []
			};
		} catch (e) {
			cleanSession();
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
