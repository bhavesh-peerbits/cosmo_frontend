import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SendCampaignRevalidationRequestParams {
	campaignId: string;
	dueDate: Date;
	collaborators: string[];
}

const sendCampaignRevalidationRequest = ({
	campaignId,
	dueDate,
	collaborators
}: SendCampaignRevalidationRequestParams) => {
	collaborators.length;
	return api.analystCampaignApi.setDueDateAndContributorsForCampaign({
		campaignId: +campaignId,
		startCampaignDto: {
			collaborators,
			dueDate: dueDate.toISOString()
		}
	});
};

export default () => {
	const queryClient = useQueryClient();
	return useMutation(sendCampaignRevalidationRequest, {
		onSuccess: () => {
			queryClient.invalidateQueries(['campaigns-ongoing-completed']);
			queryClient.invalidateQueries(['campaigns-not-started']);
			queryClient.invalidateQueries(['campaigns-reviewer']);
		}
	});
};
