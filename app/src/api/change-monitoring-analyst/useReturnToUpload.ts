import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface ReturnToUploadParameters {
	runId: number;
}

const returnToUpload = ({ runId }: ReturnToUploadParameters) => {
	return api.analystChangeMonitoringControllerApi.returnToUpload({
		runId
	});
};

const useReturnToUpload = () => {
	const queryClient = useQueryClient();
	return useMutation(returnToUpload, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring']);
			queryClient.invalidateQueries(['all-monitoring']);
			queryClient.invalidateQueries(['run-monitoring', `${variables.runId}`]);
		}
	});
};

export default useReturnToUpload;
