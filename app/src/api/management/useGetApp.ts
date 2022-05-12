import api from '@api';
import { useQuery } from 'react-query';
import { fromApplicationApi } from '@model/Application';

const useGetApp = (appId: string) => {
	return api.applicationApi
		.getApplicationById({ id: +appId })
		.then(({ data }) => fromApplicationApi(data));
};

export default (appId: string) =>
	useQuery(['managementApps', appId], () => useGetApp(appId));
