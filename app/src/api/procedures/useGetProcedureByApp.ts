import { useQueries, useQuery } from 'react-query';
import api from '@api';
import { fromProcedureAppInstanceApi } from '@model/ProcedureAppInstance';
import Application from '@model/Application';

const getProcedureByApp = (appId: string) => {
	return api.applicationApi
		.getAllProcedureForApplication({ applicationid: +appId })
		.then(({ data }) => data.map(fromProcedureAppInstanceApi));
};

const useGetProcedureByApp = (appId: string | undefined) =>
	useQuery(['procedures', appId], () => getProcedureByApp(appId as string), {
		enabled: !!appId
	});

export const useGetProceduresByApps = (apps: Application[]) => {
	return useQueries({
		queries: apps.map(app => ({
			queryKey: ['procedures', app.id],
			queryFn: () => getProcedureByApp(app.id)
		}))
	});
};

export default useGetProcedureByApp;
