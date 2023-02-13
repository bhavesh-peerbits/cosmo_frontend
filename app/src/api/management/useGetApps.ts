import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromApplicationApi } from '@model/Narrative/Application';
import { toMap } from '@model/util';

const useGetApps = () => {
	return api.applicationApi
		.getAllApplications1()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []))
		.then(toMap);
};

export default () => useQuery(['managementApps'], useGetApps);
