/* eslint-disable import/prefer-default-export */
import { AccessControllerApi, Configuration } from '@openapi/cosmo';
import axios from 'axios';
import errorManager from '@api/ErrorManager';

const DEFAULT_CONFIG = new Configuration({
	basePath: import.meta.env.COSMO_API_URL
});
axios.interceptors.response.use(
	res => res.data,
	err => errorManager(err.response)
);

export const accessApi = new AccessControllerApi(DEFAULT_CONFIG);
