import { useQuery } from '@tanstack/react-query';
import api from '@api';

export function getCampaignStatus(campaignId: string) {
	return api.analystCampaignApi
		.getCampaignStatus({
			campaignId: +campaignId
		})
		.then(({ data }) => data);
}

export default (campaignId: string) =>
	useQuery(['campaigns', campaignId, 'status'], () => getCampaignStatus(campaignId));
