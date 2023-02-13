import api from '@api';
import ProcedureAppInstance, {
	fromProcedureAppInstanceApi
} from '@model/Narrative/ProcedureAppInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import formatIso from 'date-fns/formatISO';

interface ReviewProcedureParams {
	appId: string;
	procId: string;
	endDate: Date;
}

const reviewProcedure = ({ appId, endDate, procId }: ReviewProcedureParams) => {
	return api.narrativeReview
		.startReviewOfAProcedure({
			appId: +appId,
			procId: +procId,
			narrativeReviewBody: { endDate: formatIso(endDate, { representation: 'date' }) }
		})
		.then(({ data }) => fromProcedureAppInstanceApi(data));
};

const useReviewProcedure = (appId: string, procId: string) => {
	const queryClient = useQueryClient();
	return useMutation(
		({ endDate }: { endDate: Date }) => reviewProcedure({ appId, procId, endDate }),
		{
			onSuccess: data => {
				queryClient.setQueriesData(
					['app-procedures', appId],
					old => new Map((old as Map<string, ProcedureAppInstance>).set(procId, data))
				);
				queryClient.invalidateQueries(['managementApps', appId]);
				queryClient.invalidateQueries(['reviewApps']);
				queryClient.invalidateQueries(['review-procedures']);
			}
		}
	);
};

export default useReviewProcedure;
