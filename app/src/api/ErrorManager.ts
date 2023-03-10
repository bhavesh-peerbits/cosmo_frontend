import axios, { AxiosResponse } from 'axios';
import ApiError from '@api/ApiError';
import { cleanSession, retrieveRefreshToken, setSession } from '@store/auth/authStore';
import api, { loginUrl, refreshTokenUrl } from '@api';
import { logoutApp } from '@hooks/auth/useLogout';
import mem from 'mem';

const maxAge = 10000;

export const memoizedRefreshToken = mem(
	async () => {
		const refreshToken = retrieveRefreshToken();
		if (refreshToken) {
			try {
				cleanSession();
				const resp = await api.accessApi.refreshToken({
					refreshToken
				});
				const token = resp.data.accessToken;
				if (token) {
					setSession(
						token,
						resp.data.refreshToken ?? '',
						localStorage.getItem('rememberMe') === 'true'
					);
					return token;
				}
			} catch (e) {
				// ignore error, continue with logout
			}
		}
		return null;
	},
	{
		maxAge
	}
);

async function errorManager(response: AxiosResponse) {
	const errorMessage = response?.data?.message ?? 'Generic error';
	const details = Object.entries(response?.data?.errors || {})
		.map(([key, value]) => `${key}: ${value}`)
		.join('\n');
	const originalConfig: typeof response.config & { retry?: boolean } = response?.config;

	switch (response?.status || 500) {
		case 400:
			// const errorDetails = response.data instanceof ApiErrorResponse ? response.data.
			throw new ApiError(400, `${errorMessage} ${details}`);

		// Handle unauthorized requests by redirecting to log in
		case 401:
			if (
				originalConfig &&
				originalConfig.url !== (await refreshTokenUrl) &&
				!originalConfig.retry
			) {
				originalConfig.retry = true;
				const token = await memoizedRefreshToken();
				if (token) {
					originalConfig.headers = {
						...originalConfig.headers,
						Authorization: `Bearer ${token}`
					};
					return axios(originalConfig);
				}
			}
			cleanSession();
			if (!originalConfig.url?.endsWith(await loginUrl)) {
				logoutApp(true);
				window.location.replace('/unauthorized');
				return Promise.resolve();
			}
			return Promise.reject(response);

		case 403:
			window.location.replace('/forbidden');
			return Promise.resolve();
		case 404:
			if (originalConfig && originalConfig.method !== 'GET') {
				throw new ApiError(404, errorMessage);
			}
			window.location.replace('/404');
			return Promise.resolve();
		default:
			throw new ApiError(response?.status || 500, errorMessage);
	}
}

export default errorManager;
