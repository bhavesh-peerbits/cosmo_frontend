import api from '@api';
import { useMutation, useQueryClient } from 'react-query';
import ProcedureAppInstance, {
	fromProcedureAppInstanceApi
} from '@model/ProcedureAppInstance';
import { toMap } from '@model/util';

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
		.then(({ data }) => (data ? data.map(fromProcedureAppInstanceApi) : []))
		.then(toMap);
};

const useReviewProcedures = (appId: string) => {
	const queryClient = useQueryClient();
	return useMutation(
		({ endDate, elementIds }: { endDate: Date; elementIds: number[] }) =>
			reviewProcedures({ appId, endDate, elementIds }),
		{
			onSuccess: data => {
				queryClient.setQueriesData(
					['app-procedures', appId],
					old => new Map([...(old as Map<string, ProcedureAppInstance>), ...data])
				);
				queryClient.invalidateQueries(['managementApps']);
			}
		}
	);
};

export default useReviewProcedures;
