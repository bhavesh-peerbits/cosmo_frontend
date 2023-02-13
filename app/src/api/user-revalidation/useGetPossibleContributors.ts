import { useQuery } from '@tanstack/react-query';
import api from '@api';
import { fromUserApi } from '@model/common/User';

export function getPossibleContributors(campaignId: string) {
	return api.analystCampaignApi
		.getPossibleContributors({
			campaignId: +campaignId
		})
		.then(({ data }) => data.map(fromUserApi));
}

export default (campaignId: string) =>
	useQuery(['campaigns', campaignId, 'contributors'], () =>
		getPossibleContributors(campaignId)
	);
