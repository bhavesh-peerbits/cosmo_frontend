import { AxiosResponse } from 'axios';
import ApiError from '@api/ApiError';
import { cleanSession } from '@store/auth/authStore';

async function errorManager(response: AxiosResponse) {
	const errorMessage = response?.data?.message;

	switch (response?.status || 500) {
		case 400:
			// const errorDetails = response.data instanceof ApiErrorResponse ? response.data.
			throw new ApiError(400, `Bad Request\n${errorMessage}`);
		// Handle unauthorized requests by redirecting to login
		case 401:
			cleanSession();
			window.location.href = '/unauthorized';
			return;
		case 403:
			window.location.href = '/forbidden';
			return;
		default:
			throw new ApiError(response?.status || 500, errorMessage);
	}
}

export default errorManager;
