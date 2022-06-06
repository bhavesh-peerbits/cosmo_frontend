import { useQuery } from 'react-query';
import api from '@api';
import { fromProcedureAppInstanceApi } from '@model/ProcedureAppInstance';
import { toMap } from '@model/util';

const getProcedureByApp = (appId: string) => {
	return api.applicationApi
		.getAllProcedureForApplication({ applicationid: +appId })
		.then(({ data }) => data.map(fromProcedureAppInstanceApi))
		.then(toMap);
};

const useGetProcedureByApp = (appId: string | undefined) =>
	useQuery(['app-procedures', appId], () => getProcedureByApp(appId as string), {
		enabled: !!appId
	});

export default useGetProcedureByApp;