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
			queryClient.setQueriesData(
				['app-procedures'],
				old => new Map((old as Map<string, ProcedureAppInstance>).set(data.id, data))
			);
			queryClient.invalidateQueries(['appChanges', variables.appId]);
		}
	});
};

export default useAddProcedureApp;
