import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import ProcedureAppInstance, {
	fromProcedureAppInstanceApi,
	toProcedureAppInstanceApi
} from '@model/ProcedureAppInstance';

interface EditProcedureAppParams {
	appId: string;
	procedureId: string;
	procedureAppId: string;
	procedure: ProcedureAppInstance;
}

const editProcedureApp = ({
	appId,
	procedureId,
	procedureAppId,
	procedure
}: EditProcedureAppParams) => {
	return api.procedureApi
		.modifyApplicationToProcedure({
			applicationId: +appId,
			procedureId: +procedureId,
			procedureAppInstanceId: +procedureAppId,
			procedureAppInstanceDto: toProcedureAppInstanceApi(procedure)
		})
		.then(({ data }) => fromProcedureAppInstanceApi(data));
};

const useEditProcedureApp = () => {
	const queryClient = useQueryClient();
	return useMutation(editProcedureApp, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(['procedures', variables.appId], old =>
				(old as ProcedureAppInstance[]).map(a =>
					a.id !== variables.procedureAppId ? a : data
				)
			);
		}
	});
};

export default useEditProcedureApp;
