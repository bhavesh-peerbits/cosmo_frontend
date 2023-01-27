import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SaveAnswerWithoutFileParameters {
	text?: string;
	ignore?: boolean;
	deltaFilesId: number[];
	deltaId: number;
	runId: string;
}

const saveAnswerWithoutFile = ({
	text,
	ignore,
	deltaFilesId,
	deltaId
}: SaveAnswerWithoutFileParameters) => {
	return api.analystChangeMonitoringControllerApi.saveAnswerWithoutFile({
		deltaId,
		answerMonitoringDto: {
			text,
			ignore,
			deltaFilesId
		}
	});
};

const useSaveAnswerWithoutFile = () => {
	const queryClient = useQueryClient();
	return useMutation(saveAnswerWithoutFile, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring-inbox', variables.runId]);
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};

export default useSaveAnswerWithoutFile;
