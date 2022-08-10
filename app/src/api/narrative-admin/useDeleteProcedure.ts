import api from '@api';
import { useMutation, useQueryClient } from 'react-query';

interface DeleteProcedureParams {
	procId: string;
}

const deleteProcedure = ({ procId }: DeleteProcedureParams) => {
	return api.procedureApi.deleteProcedure({ procId: +procId });
};

const useDeleteProcedure = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteProcedure, {
		onSuccess: () => {
			queryClient.invalidateQueries(['procedures']);
		}
	});
};

export default useDeleteProcedure;
