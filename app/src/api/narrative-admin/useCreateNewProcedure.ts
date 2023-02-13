import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Procedure, { toProcedureApi, fromProcedureApi } from '@model/Narrative/Procedure';

interface CreateNewProcedureParams {
	procedureData: Procedure;
}

const createNewProcedure = ({ procedureData }: CreateNewProcedureParams) => {
	return api.procedureApi
		.createNewProcedure({ procedureDto: toProcedureApi(procedureData) })
		.then(({ data }) => fromProcedureApi(data));
};

const useCreateNewProcedure = () => {
	const queryClient = useQueryClient();
	return useMutation(createNewProcedure, {
		onSuccess: () => {
			queryClient.invalidateQueries(['procedures']);
		}
	});
};

export default useCreateNewProcedure;
