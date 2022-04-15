import { AxiosResponse } from 'axios';
import ApiError from '@api/ApiError';

async function errorManager(response: AxiosResponse) {
	const errorMessage = response?.data?.message;

	switch (response?.status || 500) {
		case 400:
			// const errorDetails = response.data instanceof ApiErrorResponse ? response.data.
			throw new ApiError(400, `Bad Request\n${errorMessage}`);
		// Handle unauthorized requests by redirecting to login
		case 401:
			// TODO clear session storage, local storage, cookie
			throw new ApiError(401, `Unauthorized\n${errorMessage}`);
		default:
			throw new ApiError(response?.status || 500, errorMessage);
	}
}

export default errorManager;
