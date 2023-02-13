import { useQuery } from '@tanstack/react-query';
import api from '@api';
import { fromCampaignWithReviewApi } from '@model/UserRevalidation/CampaignWithReview';

export function getCampaign(campaignId: string) {
	return api.revalidationApi
		.getCampaignWithReviewById({
			campaignId: +campaignId
		})
		.then(({ data }) => fromCampaignWithReviewApi(data));
}

export default (campaignId: string) =>
	useQuery(['campaigns-reviewer', campaignId], () => getCampaign(campaignId));
