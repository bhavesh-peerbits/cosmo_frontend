import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import RunFileLink, { toRunFileLinkApi } from '@model/RunFileLink';
import { FileForDeltaDto } from 'cosmo-api/src/v1';

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
		fileForDelta: toRunFileLinkApi(runFileLink) as unknown as FileForDeltaDto
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
