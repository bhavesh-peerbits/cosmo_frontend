import { useQuery } from 'react-query';
import api from '@api';
import { fromCampaignApi } from '@model/Campaign';

export function getCampaign(campaignId: string) {
	return api.analystCampaignApi
		.getCampaignById({
			campaignId: +campaignId
		})
		.then(({ data }) => fromCampaignApi(data));
}

export default (campaignId: string) =>
	useQuery(['campaigns', campaignId], () => getCampaign(campaignId));
