import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import Campaign, { fromCampaignApi, toCampaignApi } from '@model/Campaign';

export function createCampaign({ campaign }: { campaign: Campaign }) {
	return api.analystCampaignApi
		.createNewCampaign({
			campaignDto: toCampaignApi(campaign)
		})
		.then(({ data }) => fromCampaignApi(data));
}

export default () => {
	const queryClient = useQueryClient();
	return useMutation(createCampaign, {
		onSuccess: data => {
			queryClient.setQueriesData(['campaigns'], old => {
				return old instanceof Map
					? new Map((old as Map<string, Campaign>).set(data.id, data))
					: data;
			});
		}
	});
};
