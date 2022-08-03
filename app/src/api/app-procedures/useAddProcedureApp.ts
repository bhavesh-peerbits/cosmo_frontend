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
			appId: +appId,
			procId: +procedureId,
			procedureAppInstanceDto: toProcedureAppInstanceApi(procedure)
		})
		.then(({ data }) => fromProcedureAppInstanceApi(data));
};

const useAddProcedureApp = () => {
	const queryClient = useQueryClient();
	return useMutation(addProcedureApp, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(
				{
					predicate: ({ queryKey }) =>
						(queryKey.length === 1 && queryKey[0] === 'app-procedures') ||
						(queryKey[0] === 'app-procedures' && queryKey[1] === variables.appId)
				},
				old => new Map((old as Map<string, ProcedureAppInstance>).set(data.id, data))
			);
			queryClient.invalidateQueries(['appChanges', variables.appId]);
		}
	});
};

export default useAddProcedureApp;
