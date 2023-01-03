import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Campaign from '@model/Campaign';

export function deleteCampaign({ campaignId }: { campaignId: string }) {
	return api.analystCampaignApi.deleteCampaign({ campaignId: +campaignId });
}

export default () => {
	const queryClient = useQueryClient();
	return useMutation(deleteCampaign, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(
				{
					predicate: ({ queryKey }) =>
						(queryKey.length === 1 && queryKey[0] === 'campaigns') ||
						(queryKey.length === 1 && queryKey[0] === 'campaigns-review')
				},
				old =>
					(old as Map<string, Campaign>).delete(variables.campaignId) &&
					new Map(old as Map<string, Campaign>)
			);
			queryClient.removeQueries(['campaigns', variables.campaignId]);
			queryClient.invalidateQueries(['campaigns-not-started']);
			queryClient.invalidateQueries(['campaigns-reviewer']);
		}
	});
};
