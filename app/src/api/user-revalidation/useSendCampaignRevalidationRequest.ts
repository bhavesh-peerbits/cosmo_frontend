import { useMutation } from 'react-query';

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
	return new Promise(resolve => {
		// TODO ask for endpoint
		setTimeout(() => {
			resolve({
				campaignId,
				dueDate,
				collaborators
			});
		}, 1000);
	});
};

export default () => useMutation(sendCampaignRevalidationRequest);
