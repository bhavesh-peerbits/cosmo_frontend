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

const useEditProcedureApp = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteProcedureApp, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(['procedures', variables.appId], old =>
				(old as ProcedureAppInstance[]).filter(a => a.id !== variables.procedureAppId)
			);
		}
	});
};

export default useEditProcedureApp;
