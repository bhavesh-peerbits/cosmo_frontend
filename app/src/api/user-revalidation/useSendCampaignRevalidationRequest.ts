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
	// TODO wait for collaborators
	return api.analystCampaignApi.setDueDateForCampaign({
		campaignId: +campaignId,
		body: dueDate.toISOString()
	});
};

export default () => useMutation(sendCampaignRevalidationRequest);
