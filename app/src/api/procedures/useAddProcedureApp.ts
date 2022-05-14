import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import ProcedureAppInstance, {
	fromProcedureAppInstanceApi,
	toProcedureAppInstanceApi
} from '@model/ProcedureAppInstance';

interface AddProcedureParams {
	appId: string;
	procedureId: string;
	procedure: ProcedureAppInstance;
}

const addProcedureApp = ({ appId, procedureId, procedure }: AddProcedureParams) => {
	return api.procedureApi
		.addApplicationToProcedure({
			applicationId: +appId,
			procedureId: +procedureId,
			procedureAppInstanceDto: toProcedureAppInstanceApi(procedure)
		})
		.then(({ data }) => fromProcedureAppInstanceApi(data));
};

const useAddProcedureApp = () => {
	const queryClient = useQueryClient();
	return useMutation(addProcedureApp, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(['procedures', variables.appId], old => [
				...(old as ProcedureAppInstance[]),
				data
			]);
		}
	});
};

export default useAddProcedureApp;
