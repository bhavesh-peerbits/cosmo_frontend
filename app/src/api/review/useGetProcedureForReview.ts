import api from '@api';
import { fromProcedureAppInstanceApi } from '@model/Narrative/ProcedureAppInstance';
import { toMap } from '@model/util';
import { useQuery } from '@tanstack/react-query';

const useGetProcedureForReview = (appId: string) => {
	return api.reviewerApi
		.getProcedureForReview({ appId: +appId })
		.then(({ data }) => data.map(fromProcedureAppInstanceApi))
		.then(toMap);
};

export default (appId: string | undefined) =>
	useQuery(
		['review-procedures', appId],
		() => useGetProcedureForReview(appId as string),
		{
			enabled: !!appId
		}
	);
