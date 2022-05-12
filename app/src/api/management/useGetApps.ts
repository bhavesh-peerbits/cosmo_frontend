import api from '@api';
import { useQuery } from 'react-query';
import { fromApplicationApi } from '@model/Application';

const useGetApps = () => {
	return api.applicationApi
		.getAllApplications()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []));
};

export default () => useQuery(['managementApps'], useGetApps);
