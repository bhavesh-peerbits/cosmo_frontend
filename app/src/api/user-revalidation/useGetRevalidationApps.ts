import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromApplicationApi } from '@model/Narrative/Application';
import { toMap } from '@model/common/util';

const useGetRevalidationApps = () => {
	return api.analystCampaignApi
		.getAllApplications2()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []))
		.then(toMap);
};

export default () => useQuery(['revalidationApps'], useGetRevalidationApps);
