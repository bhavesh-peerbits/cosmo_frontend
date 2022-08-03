import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import Application, { fromApplicationApi, toApplicationApi } from '@model/Application';

interface ReviewAppParams {
	appId: string;
	application: Application;
	modified: boolean;
}

const reviewApplication = ({ appId, application, modified }: ReviewAppParams) => {
	return api.reviewerApi
		.reviewApplication({
			appId: +appId,
			reviewApplicationDto: { application: toApplicationApi(application), modified }
		})
		.then(({ data }) => fromApplicationApi(data));
};

const useReviewApplication = () => {
	const queryClient = useQueryClient();
	return useMutation(reviewApplication, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(['reviewApps'], old => {
				if (old instanceof Map) {
					if (data.hasProcedureInReview) {
						old.set(variables.appId, data);
					} else {
						old.delete(variables.appId);
					}
					return new Map(old);
				}
				return data.hasProcedureInReview ? data : undefined;
			});
			queryClient.invalidateQueries(['managementApps'], { exact: true });
			queryClient.invalidateQueries(['managementApps', variables.appId]);
			queryClient.invalidateQueries(['appChanges', variables.appId]);
			queryClient.refetchQueries(['reviewApps']);
		}
	});
};

export default useReviewApplication;
