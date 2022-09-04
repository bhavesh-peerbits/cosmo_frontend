import api from '@api';
import Answer, { fromAnswersApi, toAnswersApi } from '@model/Answer';
import { toMap } from '@model/util';
import { useMutation, useQueryClient } from 'react-query';

interface SaveAnswersToReviewParams {
	campaignId: string;
	reviewId: string;
	answers: Answer[];
}

const saveAnswersToReview = ({ reviewId, answers }: SaveAnswersToReviewParams) => {
	return api.revalidationApi
		.saveResponseToAllAnswers({
			reviewId: +reviewId,
			answerDto: answers.map(toAnswersApi)
		})
		.then(({ data }) => data.map(fromAnswersApi))
		.then(toMap);
};

export default () => {
	const queryClient = useQueryClient();
	return useMutation(saveAnswersToReview, {
		onSuccess: (data, variables) => {
			queryClient.setQueryData(
				['answers-revalidation-review', variables.campaignId, variables.reviewId],
				old => new Map([...(old as Map<string, Answer>), ...data])
			);
		}
	});
};
