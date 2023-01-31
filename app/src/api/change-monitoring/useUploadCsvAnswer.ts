import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface UploadCsvAnswerParameters {
	file: File;
	deltaId: number;
}

const uploadCsvAnswer = ({ file, deltaId }: UploadCsvAnswerParameters) => {
	return api.changeMonitoringControllerApi.uploadCsvAnswer({
		deltaId,
		inlineObject17: { file }
	});
};

const useUploadCsvAnswer = () => {
	const queryClient = useQueryClient();
	return useMutation(uploadCsvAnswer, {
		onSuccess: () => {
			queryClient.invalidateQueries(['run-monitoring']);
		}
	});
};

export default useUploadCsvAnswer;
