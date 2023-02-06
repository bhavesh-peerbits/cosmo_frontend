import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Instance, { fromInstanceApi, toInstanceApi } from '@model/Instance';

interface ReviewInstanceParams {
	appId: string;
	instance: Instance;
}

const reviewInstance = ({ appId, instance }: ReviewInstanceParams) => {
	return api.reviewerApi
		.reviewInstance({
			appId: +appId,
			instanceDto: toInstanceApi(instance),
			instanceId: +instance.id
		})
		.then(({ data }) => fromInstanceApi(data));
};

const useReviewInstance = () => {
	const queryClient = useQueryClient();
	return useMutation(reviewInstance, {
		onSuccess: (data, variables) => {
			// queryClient.setQueriesData(['review-Instances', variables.appId], old => {
			// 	(old as Map<string, InstanceAppInstance>).delete(variables.InstanceAppId);
			// 	return new Map(old as Map<string, InstanceAppInstance>);
			// });
			queryClient.invalidateQueries(['appChanges', variables.appId]);
			queryClient.invalidateQueries(['instances-app', variables.appId]);
			queryClient.refetchQueries(['reviewApps']);
		}
	});
};

export default useReviewInstance;
