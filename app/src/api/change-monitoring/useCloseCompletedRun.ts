import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CloseCompleteRunParams {
	runId: string;
	focalPointId?: string;
	delegatesId?: string[];
	dueDate?: Date;
}
const closeCompletedRun = ({
	runId,
	focalPointId,
	delegatesId,
	dueDate
}: CloseCompleteRunParams) => {
	return api.analystChangeMonitoringControllerApi.closeCompletedRun1({
		runId: +runId,
		closeRunDto: {
			focalPoint: focalPointId,
			delegates: delegatesId,
			dueDate: dueDate?.toISOString()
		}
	});
};

const useCloseCompletedRun = () => {
	const queryClient = useQueryClient();
	return useMutation(closeCompletedRun, {
		onSuccess: (data, runId) => {
			queryClient.invalidateQueries(['monitoring']);
			queryClient.removeQueries(['run-monitoring-inbox', runId]);
			queryClient.removeQueries(['monitoring-inbox']);
		}
	});
};

export default useCloseCompletedRun;
