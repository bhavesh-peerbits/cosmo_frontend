import api from '@api';
import { useMutation, useQueryClient } from 'react-query';
import { fromProcedureApi } from '@model/Procedure';

interface ReviewProceduresParams {
	appId: string;
	endDate: Date;
	elementIds: number[];
}

const reviewProcedures = ({ appId, endDate, elementIds }: ReviewProceduresParams) => {
	return api.narrativeReview
		.startReviewOfProcedures({
			appId: +appId,
			multipleNarrativeReviewBody: {
				endDate: endDate.toISOString(),
				elementIds
			}
		})
		.then(({ data }) => (data ? data.map(fromProcedureApi) : []));
};

const useReviewProcedures = (appId: string) => {
	const queryClient = useQueryClient();
	return useMutation(
		({ endDate, elementIds }: { endDate: Date; elementIds: number[] }) =>
			reviewProcedures({ appId, endDate, elementIds }),
		{
			onSuccess: data => {
				queryClient.setQueriesData(['managementApps'], old =>
					old instanceof Map ? new Map(old.set(appId, data)) : data
				);
				queryClient.invalidateQueries(['app-procedures']);
			}
		}
	);
};

export default useReviewProcedures;
