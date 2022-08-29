import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import Application, { toApplicationApi } from '@model/Application';
import Campaign from '@model/Campaign';

interface AddAppsToCampaignParams {
	campaignId: string;
	applications: Application[];
}

const addAppsToCampaign = ({ campaignId, applications }: AddAppsToCampaignParams) => {
	return api.analystCampaignApi.addApplicationsToCampaign({
		campaignId: +campaignId,
		applicationDto: applications.map(toApplicationApi)
	});
};

const useAddAppsToCampaign = () => {
	const queryClient = useQueryClient();
	// TODO be should return the application object
	return useMutation(addAppsToCampaign, {
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
						applicationsCount: campaign.applicationsCount + 1
					});
					return newCampaign;
				}
			);
			queryClient.setQueriesData(
				{
					queryKey: ['campaigns', variables.campaignId, 'applications'],
					exact: true
				},
				oldData => {
					// TODO update with the new application
					return oldData;
				}
			);
		}
	});
};

export default useAddAppsToCampaign;
