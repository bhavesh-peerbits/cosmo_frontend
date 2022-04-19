import { atom } from 'recoil';
import { getCookie, removeCookie, setCookie } from 'tiny-cookie';
import { getAuthInfo } from '@api/user/useUserAuthInfo';
import { UserRole } from '@api';

const AUTH_STORE = 'AUTH_STORE';
const ACCESS_TOKEN_KEY = 'accessToken';

type User = {
	username: string;
	name?: string;
	surname?: string;
	email?: string;
};

type PersistedData = {
	user: User | null;
	token?: string;
	policies: UserRole[] | null;
};

const retrieveUserToken = () => {
	return sessionStorage.getItem(ACCESS_TOKEN_KEY) || getCookie(ACCESS_TOKEN_KEY);
};
const setSession = (token: string, useCookie: boolean) => {
	if (useCookie) {
		setCookie(ACCESS_TOKEN_KEY, token, {
			path: '/'
		});
	} else {
		sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
	}
};

const cleanSession = () => {
	sessionStorage.removeItem(ACCESS_TOKEN_KEY);
	removeCookie(ACCESS_TOKEN_KEY);
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
				token,
				policies: info.roles || []
			};
		} catch (e) {
			cleanSession();
		}
	}

	const data: PersistedData = JSON.parse(localStorage.getItem(AUTH_STORE) || '{}');
	return data;
};

const authStore = atom<PersistedData>({
	key: 'authStore',
	default: {
		user: null,
		policies: null
	},
	effects: [
		({ trigger, setSelf, resetSelf }) => {
			// Avoid expensive initialization
			if (trigger === 'get') {
				setSelf(retrieveUserInfo());
			}

			window.addEventListener('storage', event => {
				if (event.key === null || (event.key === AUTH_STORE && event.newValue)) {
					const data: PersistedData | null = JSON.parse(event.newValue || '{}');
					// data may be null if key is deleted in localStorage
					if (!data) {
						return;
					}
					if (data.user === null) {
						resetSelf();
						return;
					}
					retrieveUserInfo().then(setSelf);
				}
			});
		},
		({ onSet }) => {
			onSet((authInfo, old, isReset) => {
				if (isReset) {
					// remove authentication token itself
					cleanSession();
				}

				localStorage.setItem(
					AUTH_STORE,
					JSON.stringify({
						user: authInfo.user,
						policies: authInfo.policies
					})
				);
			});
		}
	]
});

export { retrieveUserToken, setSession };
export default authStore;
