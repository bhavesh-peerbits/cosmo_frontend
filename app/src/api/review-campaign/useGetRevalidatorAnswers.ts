import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { toMap } from '@model/util';
import { fromAnswersApi } from '@model/Answer';

const getAnswersForReview = (reviewId: string) => {
	return api.revalidationApi
		.getAnswersForGivenReview({ reviewId: +reviewId })
		.then(({ data }) => data.map(fromAnswersApi))
		.then(toMap);
};

export default (campaignId: string, reviewId: string) =>
	useQuery(['answers-revalidation-review', campaignId, reviewId], () =>
		getAnswersForReview(reviewId)
	);
