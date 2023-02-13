import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { toMap } from '@model/common/util';
import { fromAnswersApi } from '@model/UserRevalidation/Answer';

const getAnswersForReview = (reviewId: string) => {
	return api.analystCampaignApi
		.getAnswersForGivenReview1({ reviewId: +reviewId })
		.then(({ data }) => data.map(fromAnswersApi))
		.then(toMap);
};

export default (campaignId: string, reviewId: string) =>
	useQuery(['answers-review', campaignId, reviewId], () => getAnswersForReview(reviewId));
