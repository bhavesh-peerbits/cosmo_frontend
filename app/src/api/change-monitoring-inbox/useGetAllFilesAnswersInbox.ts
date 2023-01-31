import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromFileLinkApi } from '@model/FileLink';

interface GetAllFilesAnswersInboxParameter {
	runId: string;
}
const useGetAllFilesAnswersInbox = ({ runId }: GetAllFilesAnswersInboxParameter) => {
	return api.focalPointChangeMonitoringControllerApi
		.getAllFilesAnswers({
			runId: +runId
		})
		.then(({ data }) => (data ? [...data.values()].map(fromFileLinkApi) : []));
};

export default (runId: string) =>
	useQuery(['answers-files-inbox', runId], () => useGetAllFilesAnswersInbox({ runId }));
