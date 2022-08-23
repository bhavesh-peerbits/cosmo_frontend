import { useMutation, useQueryClient } from 'react-query';
import api from '@api';

interface AddAnswerToReviewParams {
	reviewId: string;
	file: FormData;
}

const addAnswerToReview = ({ reviewId, file }: AddAnswerToReviewParams) => {
	return api.analystCampaignApi.addAnswerToGivenReview({
		reviewId: +reviewId,
		file
	});
};

const useAddAnswerToReview = () => {
	const queryClient = useQueryClient();
	return useMutation(addAnswerToReview, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(['review', variables.reviewId], {});
		}
	});
};

export default useAddAnswerToReview;
