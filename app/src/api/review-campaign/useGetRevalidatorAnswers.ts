import api from '@api';
import { useQuery } from 'react-query';
import { toMap } from '@model/util';
import { fromAnswersApi } from '@model/Answer';

const getAnswersForReview = (reviewId: string) => {
	return api.revalidationApi
		.getAnswersForGivenReview({ reviewId: +reviewId })
		.catch(() => ({
			// TODO remove
			data: [
				{
					id: 1,
					userToRevalidate: 'federica.bruno',
					permissions: 'provPermission',
					permissionDescription: 'prova permission description'
				},
				{
					id: 2,
					userToRevalidate: 'federica.bruno',
					permissions: 'provPermission2',
					permissionDescription: 'prova permission description',
					answerType: +reviewId % 2 === 0 ? ('MODIFY' as const) : ('LOCK' as const)
				},
				{
					id: 3,
					userToRevalidate: 'prova',
					permissions: 'provPermission',
					permissionDescription: 'prova permission description',
					answerType: 'LOCK' as const
				},
				{
					id: 4,
					userToRevalidate: 'prova',
					permissions: 'provPermission',
					permissionDescription: 'prova permission description',
					answerType: 'REPORT_ERROR' as const
				}
			]
		}))
		.then(({ data }) => data.map(fromAnswersApi))
		.then(toMap);
};

export default (campaignId: string, reviewId: string) =>
	useQuery(['answers-revalidation-review', campaignId, reviewId], () =>
		getAnswersForReview(reviewId)
	);
