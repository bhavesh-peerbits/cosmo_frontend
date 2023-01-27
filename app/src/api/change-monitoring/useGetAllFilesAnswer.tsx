import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromFileLinkApi } from '@model/FileLink';

interface GetAllFilesAnswerParameter {
	runId: string;
}
const useGetAllFilesAnswer = ({ runId }: GetAllFilesAnswerParameter) => {
	return api.analystChangeMonitoringControllerApi
		.getAllFilesAnswers1({
			runId: +runId
		})
		.then(({ data }) => (data ? [...data.values()].map(fromFileLinkApi) : []));
};

export default (runId: string) =>
	useQuery(['answers-files', runId], () => useGetAllFilesAnswer({ runId }));
