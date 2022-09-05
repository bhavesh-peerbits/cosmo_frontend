import { useMutation } from 'react-query';
import api from '@api';

export function closeCampaign({ campaignId }: { campaignId: string }) {
	return api.analystCampaignApi.closeCampaignBeforeDueDate({ campaignId: +campaignId });
}

export default () => {
	// const queryClient = useQueryClient();
	return useMutation(closeCampaign, {
		// onSuccess: (data, variables) => {
		// queryClient.setQueriesData(
		// 	{
		// 		predicate: ({ queryKey }) =>
		// 			queryKey.length === 1 && queryKey[0] === 'campaigns'
		// 	},
		// 	old => {
		// 		return old instanceof Map
		// 			? new Map((old as Map<string, Campaign>).set(variables.campaignId, data))
		// 			: data;
		// 	}
		// );
		// queryClient.setQueriesData(
		// 	{
		// 		predicate: ({ queryKey }) =>
		// 			queryKey.length === 1 && queryKey[0] === 'campaigns-review'
		// 	},
		// 	old => {
		// 		return old instanceof Map
		// 			? new Map(
		// 					(old as Map<string, CampaignWithReview>).set(variables.campaignId, {
		// 						id: data.id,
		// 						campaign: data,
		// 						campaignApplications:
		// 							(old as Map<string, CampaignWithReview>).get(data.id)
		// 								?.campaignApplications || []
		// 					})
		// 			  )
		// 			: data;
		// 	}
		// );
		// }
	});
};
