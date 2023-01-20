import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Procedure, { fromProcedureApi, toProcedureApi } from '@model/Procedure';

interface EditProcedureParams {
	procedure: Procedure;
}

const editProcedure = ({ procedure }: EditProcedureParams) => {
	return api.procedureApi
		.modifyProcedure({ procedureDto: toProcedureApi(procedure) })
		.then(({ data }) => fromProcedureApi(data));
};

const useEditProcedure = () => {
	const queryClient = useQueryClient();
	return useMutation(editProcedure, {
		onSuccess: () => {
			queryClient.invalidateQueries(['procedures']);
		}
	});
};

export default useEditProcedure;
