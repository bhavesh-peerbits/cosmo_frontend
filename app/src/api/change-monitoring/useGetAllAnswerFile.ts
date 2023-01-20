import api from '@api';
import { useQuery } from '@tanstack/react-query';

const useGetAllAnswerFile = (runId: string) => {
	return api.analystChangeMonitoringControllerApi
		.getAllFilesAnswers1({ runId: +runId })
		.then(({ data }) => data);
};

export default (runId: string) =>
	useQuery(['file-answer-run', runId], () => useGetAllAnswerFile(runId), {
		cacheTime: Infinity,
		staleTime: Infinity
	});
