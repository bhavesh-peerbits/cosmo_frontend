import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import ProcedureAppInstance from '@model/ProcedureAppInstance';

interface DeleteProcedureApp {
	appId: string;
	procedureAppId: string;
	procedureId: string;
}

const deleteProcedureApp = ({
	appId,
	procedureId,
	procedureAppId
}: DeleteProcedureApp) => {
	return api.procedureApi.deleteProcedureApplicationAssociation({
		applicationId: +appId,
		procedureId: +procedureId,
		procedureAppInstanceId: +procedureAppId
	});
};

const useDeleteProcedureApp = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteProcedureApp, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(
				{
					predicate: ({ queryKey }) =>
						(queryKey.length === 1 && queryKey[0] === 'app-procedures') ||
						(queryKey[0] === 'app-procedures' && queryKey[1] === variables.appId)
				},
				old => {
					(old as Map<string, ProcedureAppInstance>).delete(variables.procedureAppId);
					return new Map(old as Map<string, ProcedureAppInstance>);
				}
			);
			queryClient.invalidateQueries(['appChanges', variables.appId]);
		}
	});
};

export default useDeleteProcedureApp;
