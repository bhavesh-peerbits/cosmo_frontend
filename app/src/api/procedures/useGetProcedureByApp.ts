import { useQuery } from 'react-query';
import api from '@api';
import { fromProcedureAppInstanceApi } from '@model/ProcedureAppInstance';

const getProcedureByApp = (appId: string) => {
	return api.applicationApi
		.getAllProcedureForApplication({ applicationid: +appId })
		.then(({ data }) => data.map(fromProcedureAppInstanceApi));
};

const useGetProcedureByApp = (appId: string | undefined) =>
	useQuery(['procedures', appId], () => getProcedureByApp(appId as string), {
		enabled: !!appId
	});

export default useGetProcedureByApp;
