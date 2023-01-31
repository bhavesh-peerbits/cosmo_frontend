import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface GoNextStepRunParameters {
	runId: string;
}

const goNextStepRun = ({ runId }: GoNextStepRunParameters) => {
	return api.analystChangeMonitoringControllerApi.goNextStep({
		runId: +runId
	});
};

const useGoNextStepRun = () => {
	const queryClient = useQueryClient();
	return useMutation(goNextStepRun, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};

export default useGoNextStepRun;
