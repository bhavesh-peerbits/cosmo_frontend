import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import FileForDelta, { toFileForDeltaApi } from '@model/ChangeMonitoring/FileForDelta';

interface AddFileForDeltaParameters {
	assetId: string;
	file: File;
	runId: string;
	fileForDelta: FileForDelta;
}

const addFileForDelta = ({
	assetId,
	runId,
	file,
	fileForDelta
}: AddFileForDeltaParameters) => {
	return api.analystChangeMonitoringControllerApi.addFileForDelta({
		assetId: +assetId,
		runId: +runId,
		file,
		fileForDelta: toFileForDeltaApi(fileForDelta)
	});
};

const useAddFileForDelta = () => {
	const queryClient = useQueryClient();
	return useMutation(addFileForDelta, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};

export default useAddFileForDelta;
