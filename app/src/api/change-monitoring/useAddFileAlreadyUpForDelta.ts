import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import FileForDelta, { toFileForDeltaApi } from '@model/FileForDelta';

interface AddFileAlreadyUpForDeltaParameters {
	assetId: string;
	fileLinkId: string;
	runId: string;
	fileForDelta: FileForDelta;
}

const addFileAlreadyUpForDelta = ({
	assetId,
	runId,
	fileLinkId,
	fileForDelta
}: AddFileAlreadyUpForDeltaParameters) => {
	return api.analystChangeMonitoringControllerApi.addAlreadyUploadedFileForDelta({
		assetId: +assetId,
		runId: +runId,
		fileLinkId: +fileLinkId,
		fileForDeltaDto: toFileForDeltaApi(fileForDelta)
	});
};

const useAddFileAlreadyUpForDelta = () => {
	const queryClient = useQueryClient();
	return useMutation(addFileAlreadyUpForDelta, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};

export default useAddFileAlreadyUpForDelta;
