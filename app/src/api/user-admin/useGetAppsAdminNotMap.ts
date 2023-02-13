import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromApplicationApi } from '@model/Narrative/Application';

const useGetAppsAdminNotMap = () => {
	return api.userAdminApi
		.getAllApplications()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []));
};

export default () => useQuery(['userAdminAppsNotMap'], useGetAppsAdminNotMap);
