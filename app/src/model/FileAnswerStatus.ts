import { FileAnswerStatusApi } from 'cosmo-api/src';
import Answer, { fromAnswersApi } from './Answer';

interface FileAnswerStatus {
	answers: Answer[];
	errors: string[];
}

export const fromFileAnswersStatusApi = (
	status: FileAnswerStatusApi
): FileAnswerStatus => {
	return {
		answers: status.first?.map(fromAnswersApi) || [],
		errors: status.second || []
	};
};

export default FileAnswerStatus;
