import { useQuery } from 'react-query';
import api from '@api';
import { fromCampaignApi } from '@model/Campaign';
import { toMap } from '@model/util';

export function getAllCampaigns() {
	return api.analystCampaignApi
		.getAllCampaigns1()
		.then(({ data }) => data.map(fromCampaignApi))
		.then(toMap);
}

export default () => useQuery(['campaigns'], () => getAllCampaigns());
