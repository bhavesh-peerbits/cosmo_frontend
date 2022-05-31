import api from '@api';
import { fromProcedureApi } from '@model/Procedure';
import { useMutation, useQueryClient } from 'react-query';

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
			narrativeReviewBody: { endDate: endDate.toISOString() }
		})
		.then(({ data }) => fromProcedureApi(data));
};

const useReviewProcedure = (appId: string, procId: string) => {
	const queryClient = useQueryClient();
	return useMutation(
		({ endDate }: { endDate: Date }) => reviewProcedure({ appId, procId, endDate }),
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

export default useReviewProcedure;
