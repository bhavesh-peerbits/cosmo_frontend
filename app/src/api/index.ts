/* eslint-disable no-param-reassign */
import axios from 'axios';
import errorManager from '@api/ErrorManager';
import configureApi, { ApiConfiguration } from 'cosmo-api';
import { retrieveUserToken } from '@store/auth/authStore';
import { AccessControllerApiAxiosParamCreator, UserDtoRolesEnum } from 'cosmo-api/src/v1';

const DEFAULT_CONFIG = new ApiConfiguration({
	basePath: import.meta.env.COSMO_API_URL
});

axios.interceptors.response.use(
	res => res,
	err => errorManager(err.response)
);
axios.interceptors.request.use(
	config => {
		const token = retrieveUserToken();
		if (token) {
			config.headers = {
				Authorization: `Bearer ${token}`
			};
		}

		return config;
	},
	err => Promise.reject(err)
);

const api = configureApi(DEFAULT_CONFIG);

export type UserRole = UserDtoRolesEnum;
export const refreshTokenUrl = AccessControllerApiAxiosParamCreator(DEFAULT_CONFIG)
	.refreshToken('')
	.then(v => DEFAULT_CONFIG.basePath + v.url);
export const loginUrl = AccessControllerApiAxiosParamCreator(DEFAULT_CONFIG)
	.login('', '', '')
	.then(v => DEFAULT_CONFIG.basePath + v.url);
export const UserRoleEnum = UserDtoRolesEnum;

export default {
	...api
};
