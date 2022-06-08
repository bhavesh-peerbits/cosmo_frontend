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
				['app-procedures'],
				old =>
					new Map(
						(old as Map<string, ProcedureAppInstance>).set(variables.procedureAppId, data)
					)
			);
			queryClient.invalidateQueries(['appChanges', variables.appId]);
		}
	});
};

export default useReviewProcedureApp;
