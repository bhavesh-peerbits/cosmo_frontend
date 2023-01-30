import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import FileLink, { toFileLinkApi } from '@model/FileLink';

interface SaveAnswerWithFileParameters {
	files: File[];
	deltaFilesId: number[];
	deltaId: number;
	runId: string;
	fileLinks: FileLink[];
	text?: string;
}

const saveAnswerWithFile = ({
	files,
	deltaFilesId,
	deltaId,
	fileLinks,
	text
}: SaveAnswerWithFileParameters) => {
	return api.analystChangeMonitoringControllerApi.saveAnswerWithFile({
		deltaId,
		answer: {
			deltaFilesId,
			fileslinks: { fileLinks: fileLinks.map(toFileLinkApi) },
			text
		},
		files
	});
};

const useSaveAnswerWithFile = () => {
	const queryClient = useQueryClient();
	return useMutation(saveAnswerWithFile, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring-inbox', variables.runId]);
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
			queryClient.invalidateQueries(['answers-files']);
		}
	});
};

export default useSaveAnswerWithFile;
