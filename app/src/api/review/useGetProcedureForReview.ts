import api from '@api';
import { fromProcedureAppInstanceApi } from '@model/ProcedureAppInstance';
import { toMap } from '@model/util';
import { useQuery } from 'react-query';

const useGetProcedureForReview = (appId: string) => {
	return api.reviewerApi
		.getProcedureForReview({ applicationId: +appId })
		.then(({ data }) => data.map(fromProcedureAppInstanceApi))
		.then(toMap);
};

export default (appId: string | undefined) =>
	useQuery(
		['review-procedures', appId], // TODO check query
		() => useGetProcedureForReview(appId as string),
		{
			enabled: !!appId
		}
	);
