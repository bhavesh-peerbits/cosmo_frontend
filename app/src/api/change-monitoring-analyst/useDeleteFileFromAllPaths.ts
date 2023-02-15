import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteFileParams {
	runId: string;
	assetId: string;
	fileLinkId: string;
}

const deleteFileFromAllPaths = ({ runId, assetId, fileLinkId }: DeleteFileParams) => {
	return api.analystChangeMonitoringControllerApi.deleteFileFromAllPaths({
		runId: +runId,
		assetId: +assetId,
		fileLinkId: +fileLinkId
	});
};

const useDeleteFileFromAllPaths = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteFileFromAllPaths, {
		onSuccess: () => {
			queryClient.invalidateQueries(['run-monitoring']);
		}
	});
};

export default useDeleteFileFromAllPaths;
