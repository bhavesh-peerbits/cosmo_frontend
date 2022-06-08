import axios, { AxiosResponse } from 'axios';
import ApiError from '@api/ApiError';
import { cleanSession, retrieveRefreshToken, setSession } from '@store/auth/authStore';
import api, { loginUrl, refreshTokenUrl } from '@api';
import { logoutApp } from '@hooks/auth/useLogout';

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
							originalConfig.headers = {
								...originalConfig.headers,
								Authorization: `Bearer ${token}`
							};
							return await axios(originalConfig);
						}
					} catch (e) {
						// ignore error, continue with logout
					}
				}
			}
			cleanSession();
			// eslint-disable-next-line no-console
			console.log(
				`login URL: ${await loginUrl}, originalConfig: ${await originalConfig.url}`
			);
			if (originalConfig.url !== (await loginUrl)) {
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
