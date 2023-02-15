import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteFileParams {
	runId: string;
	assetId: string;
	rflIds: number[];
}

const deleteFileFromSomePaths = ({ runId, assetId, rflIds }: DeleteFileParams) => {
	return api.analystChangeMonitoringControllerApi.deleteFileFromSomePaths({
		runId: +runId,
		assetId: +assetId,
		setRFLDto: { rflIds }
	});
};

const useDeleteFileFromSomePaths = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteFileFromSomePaths, {
		onSuccess: () => {
			queryClient.invalidateQueries(['run-monitoring']);
		}
	});
};

export default useDeleteFileFromSomePaths;
