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
			queryClient.setQueriesData(
				['app-procedures'],
				old =>
					new Map(
						(old as Map<string, ProcedureAppInstance>).set(variables.procedureAppId, data)
					)
			);
		}
	});
};

export default useEditProcedureApp;
