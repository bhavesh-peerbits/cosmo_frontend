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
		answerFileAlreadyUploadedDto: {
			text,
			fileslinkIds: fileLinkIds,
			deltaFilesId
		}
	});
};

const useSaveAnswerWithFileUploaded = () => {
	const queryClient = useQueryClient();
	return useMutation(saveAnswerWithFileUploaded, {
		onSuccess: () => {
			queryClient.invalidateQueries(['run-monitoring-inbox']);
			queryClient.invalidateQueries(['run-monitoring']);
			queryClient.invalidateQueries(['answers-files']);
		}
	});
};

export default useSaveAnswerWithFileUploaded;
