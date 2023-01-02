import { useQuery } from '@tanstack/react-query';
import api from '@api';
import { toMap } from '@model/util';
import { fromCampaignWithReviewApi } from '@model/CampaignWithReview';

export function getAllCampaignsWithReview() {
	return api.analystCampaignApi
		.getAllCampaignsWithReviews()
		.then(({ data }) => data.map(fromCampaignWithReviewApi))
		.then(toMap);
}

export default () => useQuery(['campaigns-review'], () => getAllCampaignsWithReview());
