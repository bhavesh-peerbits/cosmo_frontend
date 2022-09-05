import { useMutation, useQueryClient } from 'react-query';
import api from '@api';

interface AddContributorsToCampaignParams {
	campaignId: string;
	users: string[];
}

const addContributorsToCampaign = ({
	campaignId,
	users
}: AddContributorsToCampaignParams) => {
	return api.analystCampaignApi.addContributorsToCampaign({
		campaignId: +campaignId,
		requestBody: users
	});
};

const useAddContributorsToCampaign = () => {
	const queryClient = useQueryClient();
	return useMutation(addContributorsToCampaign, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(
				{
					queryKey: ['campaigns', variables.campaignId],
					exact: true
				},
				() => {
					return data;
				}
			);
		}
	});
};

export default useAddContributorsToCampaign;
