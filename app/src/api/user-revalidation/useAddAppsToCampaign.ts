import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import Application, { toApplicationApi } from '@model/Application';

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
	return useMutation(addAppsToCampaign, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(['applicationCampaign', variables.campaignId], {});
		}
	});
};

export default useAddAppsToCampaign;
