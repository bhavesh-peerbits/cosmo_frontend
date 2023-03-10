import { useQuery } from '@tanstack/react-query';
import api from '@api';
import { fromCampaignApplicationApi } from '@model/UserRevalidation/CampaignApplication';
import { toMap } from '@model/common/util';

export function getCampaignApplications(campaignId: string) {
	return api.analystCampaignApi
		.getApplicationsOfCampaign1({
			campaignId: +campaignId
		})
		.then(({ data }) => data.map(fromCampaignApplicationApi))
		.then(toMap);
}

export default (campaignId: string, enabled = true) =>
	useQuery(
		['campaigns', campaignId, 'applications'],
		() => getCampaignApplications(campaignId),
		{ enabled }
	);
