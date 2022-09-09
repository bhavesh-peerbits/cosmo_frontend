import api from '@api';
import { useQuery } from 'react-query';
import { fromApplicationApi } from '@model/Application';
import { toMap } from '@model/util';

const useGetAppsAdmin = () => {
	return api.userAdminApi
		.getAllApplications()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []))
		.then(toMap);
};

export default () => useQuery(['userAdminApps'], useGetAppsAdmin);