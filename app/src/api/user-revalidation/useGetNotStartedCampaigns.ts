import { useQuery } from 'react-query';
import api from '@api';
import { toMap } from '@model/util';
import { fromCampaignApi } from '@model/Campaign';

export function getNotStartedCampaigns() {
	return api.analystCampaignApi
		.getAllNotStartedCampaigns()
		.then(({ data }) => data.map(fromCampaignApi))
		.then(toMap);
}

export default () => useQuery(['campaigns-not-started'], () => getNotStartedCampaigns());