import api from '@api';
import { fromProcedureAppInstanceApi } from '@model/ProcedureAppInstance';
import { useMutation, useQueryClient } from 'react-query';
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
				queryClient.setQueriesData(['app-procedures', procId], old =>
					old instanceof Map ? new Map(old.set(appId, data)) : data
				);
				queryClient.invalidateQueries(['managementApps', appId]);
			}
		}
	);
};

export default useReviewProcedure;
