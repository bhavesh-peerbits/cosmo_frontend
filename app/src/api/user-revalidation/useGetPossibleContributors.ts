import { useQuery } from 'react-query';
import api from '@api';
import { fromUserApi } from '@model/User';
import { toMap } from '@model/util';

export function getPossibleContributors(campaignId: string) {
	return api.analystCampaignApi
		.getPossibleContributors({
			campaignId: +campaignId
		})
		.then(({ data }) => data.map(fromUserApi))
		.then(toMap);
}

export default (campaignId: string) =>
	useQuery(['campaigns', campaignId, 'contributors'], () =>
		getPossibleContributors(campaignId)
	);
