import { useMutation, useQueryClient } from 'react-query';
import Application from '@model/Application';
import Campaign from '@model/Campaign';

interface DeleteAppFromCampaignParams {
	campaignId: string;
	campaignApplicationId: string;
}

const deleteAppFromCampaign = ({
	campaignId,
	campaignApplicationId
}: DeleteAppFromCampaignParams) => {
	// return api.analystCampaignApi.deleteApplicationFromCampaign({
	// 	campaignId: +campaignId,
	// 	applicationId: +applicationId
	// }); TODO create endpoint
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ campaignId, campaignApplicationId });
		}, 1000);
	});
};

const useDeleteAppFromCampaign = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteAppFromCampaign, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(
				{
					queryKey: ['campaigns', variables.campaignId],
					exact: true
				},
				oldValue => {
					const campaign = oldValue as Campaign;
					const newCampaign = {};
					Object.assign(newCampaign, campaign, {
						applicationsCount: campaign.applicationsCount - 1
					});
					return newCampaign;
				}
			);
			queryClient.setQueriesData(
				['campaigns', variables.campaignId, 'applications'],
				oldValue => {
					(oldValue as Map<string, Application>).delete(variables.campaignApplicationId);
					return new Map(oldValue as Map<string, Application>);
				}
			);
		}
	});
};

export default useDeleteAppFromCampaign;
