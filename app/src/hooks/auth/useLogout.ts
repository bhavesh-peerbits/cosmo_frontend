import { cleanSession } from '@store/auth/authStore';
import { setCookie } from 'tiny-cookie';

const REDIRECT_PATH_COOKIE = 'postLoginRedirectPath';

const NO_REDIRECT_PATHS = [
	'/',
	'/home',
	'/logout',
	'/404',
	'/unauthorized',
	'/forbidden',
	'/unauthorized'
];
const useLogout = () => {
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
		logout
	};
};

export default useLogout;
