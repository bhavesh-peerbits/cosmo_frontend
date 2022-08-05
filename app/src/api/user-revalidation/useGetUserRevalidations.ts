import { useQuery } from 'react-query';
import api from '@api';
import { fromCampaignApi } from '@model/Campaign';
import { toMap } from '@model/util';

export function getUserRevalidations() {
	return api.revalidationApi
		.getAllCampaigns()
		.then(({ data }) => data.map(fromCampaignApi))
		.then(toMap);
}

export default () => useQuery(['userRevalidation'], () => getUserRevalidations());
