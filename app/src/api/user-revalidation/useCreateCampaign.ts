import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import Campaign, { fromCampaignApi, toCampaignApi } from '@model/Campaign';
import CampaignWithReview from '@model/CampaignWithReview';

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
			queryClient.setQueriesData(
				{
					predicate: ({ queryKey }) =>
						queryKey.length === 1 && queryKey[0] === 'campaigns'
				},
				old => {
					return old instanceof Map
						? new Map((old as Map<string, Campaign>).set(data.id, data))
						: data;
				}
			);
			queryClient.setQueriesData(
				{
					predicate: ({ queryKey }) =>
						queryKey.length === 1 && queryKey[0] === 'campaigns-review'
				},
				old => {
					return old instanceof Map
						? new Map(
								(old as Map<string, CampaignWithReview>).set(data.id, {
									id: data.id,
									campaign: data,
									campaignApplications: []
								})
						  )
						: data;
				}
			);
			queryClient.invalidateQueries([['campaigns-reviewer']]);
		}
	});
};
