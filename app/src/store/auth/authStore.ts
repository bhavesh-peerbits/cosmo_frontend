import { atom } from 'recoil';
import { getCookie, removeCookie } from 'tiny-cookie';

const AUTH_STORE = 'AUTH_STORE';

type PersistedData = {
	user: object | null;
	token?: string;
	policies: object[] | null;
};

const retrieveUserInfo = async () => {
	const token = sessionStorage.getItem('accessToken') || getCookie('accessToken');
	if (token) {
		// TODO fetch user info
		return {
			user: {},
			token,
			policies: []
		};
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
		({ trigger, setSelf, onSet, resetSelf }) => {
			// Avoid expensive initialization
			if (trigger === 'get') {
				setSelf(retrieveUserInfo());
			}

			onSet((authInfo, old, isReset) => {
				if (isReset) {
					// remove authentication token itself
					removeCookie('accessToken', {
						path: '/'
					});
				}

				localStorage.setItem(
					AUTH_STORE,
					JSON.stringify({
						user: authInfo.user,
						policy: authInfo.policies
					})
				);
			});

			window.addEventListener('storage', event => {
				if (event.key === AUTH_STORE && event.newValue) {
					const data: PersistedData | null = JSON.parse(event.newValue || '{}');
					// data may be null if key is deleted in localStorage
					if (!data) {
						return;
					}
					if (data.user === null) {
						resetSelf();
					}
					retrieveUserInfo().then(setSelf);
				}
			});
		}
	]
});

export default authStore;
