import { useRecoilValue, useResetRecoilState } from 'recoil';
import authStore from '@store/auth/authStore';
import { setCookie } from 'tiny-cookie';

const NO_REDIRECT_PATHS = ['/', '/home'];

const useAuthStore = () => {
	const auth = useRecoilValue(authStore);
	const resetAuth = useResetRecoilState(authStore);

	const login = () => {
		setCookie('accessToken', 'TODO');
		window.location.href = '/home';
	};

	const logout = (savePath = false) => {
		// if this logout was forced from an authenticated route then
		// save the current path, so we can go back there once signed in
		if (savePath) {
			const pathName = window.location.pathname;

			if (!NO_REDIRECT_PATHS.includes(pathName)) {
				setCookie('postLoginRedirectPath', pathName);
			}
		}

		setTimeout(() => resetAuth());
	};
	return {
		auth: {
			...auth,
			authenticated: Boolean(auth.token)
		},
		login,
		logout
	};
};

export default useAuthStore;
