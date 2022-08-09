import { useMutation } from 'react-query';
import { CampaignDtoTypeApi } from 'cosmo-api/src';

export function getCampaignTemplate(type: CampaignDtoTypeApi) {
	// return api.analystCampaignApi
	// 	.createNewCampaign({
	// 		campaignDto: toCampaignApi(campaign)
	// 	})
	// 	.then(({ data }) => fromCampaignApi(data));
	return new Promise(resolve => {
		setTimeout(() => resolve([type, 'Field 1', 'Field 2', 'Field 3']), 1000);
	});
}

export default () =>
	useMutation(({ type }: { type: CampaignDtoTypeApi }) => getCampaignTemplate(type));
