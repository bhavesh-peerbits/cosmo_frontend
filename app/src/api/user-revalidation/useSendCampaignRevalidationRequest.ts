import { useMutation } from 'react-query';
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

export default () => useMutation(sendCampaignRevalidationRequest);
