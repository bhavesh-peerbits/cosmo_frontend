import api from '@api';
import { useQuery } from 'react-query';
import { fromApplicationApi } from '@model/Application';
import { toMap } from '@model/util';

const useGetRevalidationApps = () => {
	return api.analystCampaignApi
		.getAllApplications2()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []))
		.then(toMap);
};

export default () => useQuery(['revalidationApps'], useGetRevalidationApps);
