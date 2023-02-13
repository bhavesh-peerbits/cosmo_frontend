import api from '@api';
import { fromApplicationApi } from '@model/Narrative/Application';
import { toMap } from '@model/util';
import { useQuery } from '@tanstack/react-query';

const useGetAppsInReview = () => {
	return api.reviewerApi
		.getAllApplicationWhereAProcedureIsDelegatedOrOwner()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []))
		.then(toMap);
};

export default () => useQuery(['reviewApps'], useGetAppsInReview);
