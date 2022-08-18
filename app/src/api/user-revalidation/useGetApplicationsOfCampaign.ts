import { useQuery } from 'react-query';
import api from '@api';
import { fromCampaignApplicationApi } from '@model/CampaignApplication';
import { toMap } from '@model/util';

export function getApplicationsOfCampaign(campaignId: string) {
	return api.revalidationApi
		.getApplicationsOfCampaign({
			campaignId: +campaignId
		})
		.then(({ data }) => data.map(fromCampaignApplicationApi))
		.then(toMap);
}

export default (campaignId: string) =>
	useQuery(['campaigns-reviewer', campaignId, 'applications'], () =>
		getApplicationsOfCampaign(campaignId)
	);
