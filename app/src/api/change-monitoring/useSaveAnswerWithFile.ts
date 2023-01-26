import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SaveAnswerWithFileParameters {
	files: string[];
	deltaFilesId: number[];
	deltaId: number;
	runId: string;
}

const saveAnswerWithFile = ({
	files,
	deltaFilesId,
	deltaId
}: SaveAnswerWithFileParameters) => {
	return api.analystChangeMonitoringControllerApi.saveAnswerWithFile({
		deltaId,
		deltaFilesId,
		files
	});
};

const useSaveAnswerWithFile = () => {
	const queryClient = useQueryClient();
	return useMutation(saveAnswerWithFile, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring-inbox', variables.runId]);
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};

export default useSaveAnswerWithFile;
