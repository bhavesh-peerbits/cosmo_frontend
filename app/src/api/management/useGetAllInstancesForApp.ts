import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromInstanceApi } from '@model/Instance';

const useGetAllInstancesForApp = (appId: string) => {
	return api.applicationApi
		.getAllInstanceForApplication({ appId: +appId })
		.then(({ data }) => (data ? data.map(fromInstanceApi) : []));
};

export default (appId: string) =>
	useQuery(['instances-app'], () => useGetAllInstancesForApp(appId));
