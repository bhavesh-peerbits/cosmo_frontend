import axios from 'axios';
import errorManager from '@api/ErrorManager';
import configureApi, { ApiConfiguration } from 'cosmo-api';

const DEFAULT_CONFIG = new ApiConfiguration({
	basePath: import.meta.env.COSMO_API_URL
});

axios.interceptors.response.use(
	res => res.data,
	err => errorManager(err.response)
);

const api = configureApi(DEFAULT_CONFIG);

export default {
	...api
};
