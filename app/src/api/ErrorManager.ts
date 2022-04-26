import axios, { AxiosResponse } from 'axios';
import ApiError from '@api/ApiError';
import { cleanSession, retrieveRefreshToken, setSession } from '@store/auth/authStore';
import api, { refreshTokenUrl } from '@api';

async function errorManager(response: AxiosResponse) {
	const errorMessage = response?.data?.message ?? 'Generic error';
	const originalConfig: typeof response.config & { retry?: boolean } = response?.config;

	switch (response?.status || 500) {
		case 400:
			// const errorDetails = response.data instanceof ApiErrorResponse ? response.data.
			throw new ApiError(400, `Bad Request\n${errorMessage}`);

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
							refreshToken,
							tenant: 'cosmo'
						});
						const token = resp.data.accessToken;
						if (token) {
							setSession(
								token,
								resp.data.refreshToken ?? '',
								localStorage.getItem('rememberMe') === 'true'
							);
							originalConfig.headers = {
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
			window.location.href = '/unauthorized';
			return Promise.resolve();

		case 403:
			window.location.href = '/forbidden';
			return Promise.resolve();
		default:
			throw new ApiError(response?.status || 500, errorMessage);
	}
}

export default errorManager;
