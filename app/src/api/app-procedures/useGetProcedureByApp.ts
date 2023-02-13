import { useQuery } from '@tanstack/react-query';
import api from '@api';
import { fromProcedureAppInstanceApi } from '@model/Narrative/ProcedureAppInstance';
import { toMap } from '@model/common/util';

const getProcedureByApp = (appId: string) => {
	return api.applicationApi
		.getAllProcedureForApplication({ appId: +appId })
		.then(({ data }) => data.map(fromProcedureAppInstanceApi))
		.then(toMap);
};

const useGetProcedureByApp = (appId: string | undefined) =>
	useQuery(['app-procedures', appId], () => getProcedureByApp(appId as string), {
		enabled: !!appId
	});

export default useGetProcedureByApp;
