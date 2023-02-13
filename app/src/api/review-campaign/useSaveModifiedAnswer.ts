import api from '@api';
import Answer, { fromAnswersApi, toAnswersApi } from '@model/UserRevalidation/Answer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SaveModifiedAnswerParams {
	answer: Answer;
	revId: string;
}

const saveModifiedAnswer = ({ answer, revId }: SaveModifiedAnswerParams) => {
	return api.analystCampaignApi
		.saveModifiedAnswer({
			answerDto: toAnswersApi(answer),
			revId: +revId
		})
		.then(({ data }) => fromAnswersApi(data));
};

export default () => {
	const queryClient = useQueryClient();
	return useMutation(saveModifiedAnswer, {
		onSuccess: () => {
			queryClient.invalidateQueries(['answers-review']);
		}
	});
};
