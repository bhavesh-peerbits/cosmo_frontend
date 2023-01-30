import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface DeleteAnswerParameters {
	deltaId: number;
	justificationId: number;
}

const deleteAnswer = ({ deltaId, justificationId }: DeleteAnswerParameters) => {
	return api.analystChangeMonitoringControllerApi.deleteAnswer({
		deltaId,
		justificationId
	});
};

const useDeleteAnswer = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteAnswer, {
		onSuccess: () => {
			queryClient.invalidateQueries(['run-monitoring-inbox']);
			queryClient.invalidateQueries(['run-monitoring']);
			queryClient.invalidateQueries(['answers-files']);
		}
	});
};

export default useDeleteAnswer;
