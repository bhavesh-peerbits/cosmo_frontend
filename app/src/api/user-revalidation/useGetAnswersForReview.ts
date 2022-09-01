import api from '@api';
import { useQuery } from 'react-query';
import { toMap } from '@model/util';
import { fromAnswersApi } from '@model/Answer';

const getAnswersForReview = (reviewId: string) => {
	return api.analystCampaignApi
		.getAnswersForGivenReview1({ reviewId: +reviewId })
		.then(() => ({
			data: [
				{ id: 1, answerType: 'OK' as const },
				{ id: 2, answerType: 'LOCK' as const },
				{ id: 3, answerType: 'OK' as const },
				{ id: 4, answerType: 'MODIFY' as const }
			]
		})) // TODO remove
		.then(({ data }) => data.map(fromAnswersApi))
		.then(toMap);
};

export default (campaignId: string, reviewId: string) =>
	useQuery(['answers-review', campaignId, reviewId], () => getAnswersForReview(reviewId));
