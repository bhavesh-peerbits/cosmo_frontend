import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import RunFileLink, { toRunFileLinkApi } from '@model/RunFileLink';

interface AddFileForDeltaParameters {
	assetId: string;
	file: File;
	runFileLink: RunFileLink;
	runId: string;
}

const addFileForDelta = ({
	assetId,
	runId,
	runFileLink,
	file
}: AddFileForDeltaParameters) => {
	return api.analystChangeMonitoringControllerApi.addFileForDelta({
		assetId: +assetId,
		runId: +runId,
		file,
		runFileLink: toRunFileLinkApi(runFileLink)
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
