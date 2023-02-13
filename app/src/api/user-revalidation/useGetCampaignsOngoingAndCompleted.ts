import { useQuery } from '@tanstack/react-query';
import api from '@api';
import { toMap } from '@model/util';
import { fromCampaignWithReviewApi } from '@model/UserRevalidation/CampaignWithReview';

export function getCampaignsOngoingAndCompleted() {
	return api.analystCampaignApi
		.getAllCampaignsOngoingAndCompleteWithReviews()
		.then(({ data }) => data.map(fromCampaignWithReviewApi))
		.then(toMap);
}

export default () =>
	useQuery(['campaigns-ongoing-completed'], () => getCampaignsOngoingAndCompleted());
