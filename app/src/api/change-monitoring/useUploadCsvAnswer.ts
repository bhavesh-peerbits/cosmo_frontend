import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface UploadCsvAnswerParameters {
	file: File;
	deltaId: number;
}

const uploadCsvAnswer = ({ file, deltaId }: UploadCsvAnswerParameters) => {
	return api.analystChangeMonitoringControllerApi.uploadCsvAnswer1({
		deltaId,
		inlineObject18: { file }
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
