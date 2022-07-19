import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import ProcedureAppInstance, {
	fromProcedureAppInstanceApi,
	toProcedureAppInstanceApi
} from '@model/ProcedureAppInstance';

interface ReviewProcedureParams {
	appId: string;
	procedureId: string;
	procedureAppId: string;
	procedure: ProcedureAppInstance;
	modified: boolean;
}

const reviewProcedure = ({
	appId,
	procedureId,
	procedureAppId,
	procedure,
	modified
}: ReviewProcedureParams) => {
	return api.reviewerApi
		.reviewProcedure({
			applicationId: +appId,
			procedureId: +procedureId,
			procedureAppInstanceId: +procedureAppId,
			reviewProcedureDto: {
				modified,
				procedureAppInstanceDto: toProcedureAppInstanceApi(procedure)
			}
		})
		.then(({ data }) => fromProcedureAppInstanceApi(data));
};

const useReviewProcedureApp = () => {
	const queryClient = useQueryClient();
	return useMutation(reviewProcedure, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(
				{
					predicate: ({ queryKey }) =>
						(queryKey.length === 1 && queryKey[0] === 'app-procedures') ||
						(queryKey[0] === 'app-procedures' && queryKey[1] === variables.appId)
				},
				old =>
					new Map(
						(old as Map<string, ProcedureAppInstance>).set(variables.procedureAppId, data)
					)
			);
			queryClient.setQueriesData(['review-procedures', variables.appId], old => {
				(old as Map<string, ProcedureAppInstance>).delete(variables.procedureAppId);
				return new Map(old as Map<string, ProcedureAppInstance>);
			});
			queryClient.invalidateQueries(['appChanges', variables.appId]);
			queryClient.refetchQueries(['reviewApps']);
		}
	});
};

export default useReviewProcedureApp;
