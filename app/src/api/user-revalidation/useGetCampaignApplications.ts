import { useQuery } from 'react-query';
import api from '@api';
import { fromCampaignApplicationApi } from '@model/CampaignApplication';
import { toMap } from '@model/util';

export function getCampaignApplications(campaignId: string) {
	// TODO change API parameters to use campaignId
	return api.analystCampaignApi
		.getApplicationsOfCampaign1({
			campaignName: campaignId
		})
		.then(({ data }) => data.map(fromCampaignApplicationApi))
		.then(toMap);
}

export default (campaignId: string) =>
	useQuery(['campaigns', campaignId, 'applications'], () =>
		getCampaignApplications(campaignId)
	);
