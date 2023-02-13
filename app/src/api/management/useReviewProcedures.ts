import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ProcedureAppInstance, {
	fromProcedureAppInstanceApi
} from '@model/Narrative/ProcedureAppInstance';
import { toMap } from '@model/util';
import formatIso from 'date-fns/formatISO';

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
				endDate: formatIso(endDate, { representation: 'date' }),
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
				queryClient.invalidateQueries(['reviewApps']);
				queryClient.invalidateQueries(['review-procedures']);
			}
		}
	);
};

export default useReviewProcedures;
