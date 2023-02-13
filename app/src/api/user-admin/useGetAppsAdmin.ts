import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromApplicationApi } from '@model/Narrative/Application';
import { toMap } from '@model/common/util';

const useGetAppsAdmin = () => {
	return api.userAdminApi
		.getAllApplications()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []))
		.then(toMap);
};

export default () => useQuery(['userAdminApps'], useGetAppsAdmin);
