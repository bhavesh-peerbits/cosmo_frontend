import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import Application, { fromApplicationApi, toApplicationApi } from '@model/Application';

interface ReviewAppParams {
	appId: string;
	application: Application;
	isModified: boolean;
}

const reviewApplication = ({ appId, application, isModified }: ReviewAppParams) => {
	return api.reviewerApi
		.reviewApplication({
			applicationId: +appId,
			inlineObject: { application: toApplicationApi(application), isModified }
		})
		.then(({ data }) => fromApplicationApi(data));
};

const useReviewApplication = () => {
	const queryClient = useQueryClient();
	return useMutation(reviewApplication, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(['reviewApps'], old =>
				old instanceof Map ? new Map(old.set(variables.appId, data)) : data
			);
			queryClient.invalidateQueries(['appChanges', variables.appId]);
		}
	});
};

export default useReviewApplication;
