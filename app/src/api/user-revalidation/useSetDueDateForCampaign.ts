import { useMutation, useQueryClient } from 'react-query';
import api from '@api';

export function setDueDateForCampaign({
	campaignId,
	dueDate
}: {
	campaignId: string;
	dueDate: Date;
}) {
	return api.analystCampaignApi.setDueDateForCampaign({
		campaignId: +campaignId,
		body: dueDate.toISOString()
	});
}

export default () => {
	const queryClient = useQueryClient();
	return useMutation(setDueDateForCampaign, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['campaigns', variables.campaignId]);
		}
	});
};
