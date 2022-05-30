import api from '@api';
import { useQuery } from 'react-query';
import { fromApplicationApi } from '@model/Application';
import { toMap } from '@model/util';

const useGetApps = () => {
	return api.applicationApi
		.getAllApplications()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []))
		.then(toMap);
};

export default () => useQuery(['managementApps'], useGetApps);
