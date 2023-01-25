import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import FileForDelta, { toFileForDeltaApi } from '@model/FileForDelta';

interface AddOldRunFileForDeltaParameters {
	assetId: string;
	runId: string;
	fileForDelta: FileForDelta;
}

const addOldRunFileForDelta = ({
	assetId,
	runId,
	fileForDelta
}: AddOldRunFileForDeltaParameters) => {
	return api.analystChangeMonitoringControllerApi.addOldRunFileForDelta({
		assetId: +assetId,
		runId: +runId,
		fileForDeltaDto: toFileForDeltaApi(fileForDelta)
	});
};

const useAddOldRunFileForDelta = () => {
	const queryClient = useQueryClient();
	return useMutation(addOldRunFileForDelta, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};

export default useAddOldRunFileForDelta;
