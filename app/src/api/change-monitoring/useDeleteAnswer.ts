import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface DeleteAnswerParameters {
	deltaId: number;
	deltaFileId: number;
}

const deleteAnswer = ({ deltaId, deltaFileId }: DeleteAnswerParameters) => {
	return api.changeMonitoringControllerApi.deleteAnswer({
		deltaId,
		deltaFileId
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
