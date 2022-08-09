import { useMutation } from 'react-query';
import api from '@api';
import Campaign, { fromCampaignApi, toCampaignApi } from '@model/Campaign';

export function createCampaign(campaign: Campaign) {
	return api.analystCampaignApi
		.createNewCampaign({
			campaignDto: toCampaignApi(campaign)
		})
		.then(({ data }) => fromCampaignApi(data));
}

export default () =>
	useMutation(({ campaign }: { campaign: Campaign }) => createCampaign(campaign));
