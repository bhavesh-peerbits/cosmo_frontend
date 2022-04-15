import { useRecoilValue, useResetRecoilState } from 'recoil';
import authStore from '@store/auth/authStore';
import { setCookie } from 'tiny-cookie';
import useLogin from '@api/useLogin';

const NO_REDIRECT_PATHS = ['/', '/home'];

interface LoginData {
	user: string;
	password: string;
	rememberMe: boolean;
}

const useAuthStore = () => {
	const auth = useRecoilValue(authStore);
	const resetAuth = useResetRecoilState(authStore);
	const loginApi = useLogin();
	const login = async ({ user, password, rememberMe }: LoginData) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const resp = await loginApi.mutateAsync({
			user,
			password,
			tenant: 'cosmo'
		});
		if (rememberMe) {
			setCookie('accessToken', user, {
				path: '/'
			});
		} else {
			sessionStorage.setItem('accessToken', user);
		}
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
