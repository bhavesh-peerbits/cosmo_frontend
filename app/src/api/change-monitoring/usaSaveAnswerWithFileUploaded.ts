import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SaveAnswerWithFileUploadedParameters {
	deltaFilesId: number[];
	deltaId: number;
	text?: string;
	fileLinkIds: number[];
}

const saveAnswerWithFileUploaded = ({
	fileLinkIds,
	deltaFilesId,
	deltaId,
	text
}: SaveAnswerWithFileUploadedParameters) => {
	return api.analystChangeMonitoringControllerApi.saveAnswerWithFileAlreadyUploaded({
		deltaId,
		inlineObject21: {
			answer: {
				text,
				fileslinkIds: fileLinkIds,
				deltaFilesId
			}
		}
	});
};

const useSaveAnswerWithFileUploaded = () => {
	const queryClient = useQueryClient();
	return useMutation(saveAnswerWithFileUploaded, {
		onSuccess: () => {
			queryClient.invalidateQueries(['run-monitoring-inbox']);
			queryClient.invalidateQueries(['run-monitoring']);
		}
	});
};

export default useSaveAnswerWithFileUploaded;
