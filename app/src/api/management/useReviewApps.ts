import api from '@api';
import { fromApplicationApi } from '@model/Application';
import { useMutation, useQueryClient } from 'react-query';
import { toMap } from '@model/util';

interface ReviewAppsParams {
	endDate: Date;
	elementIds: number[];
}

const reviewApps = ({ endDate, elementIds }: ReviewAppsParams) => {
	return api.narrativeReview
		.startReviewOfApplications({
			multipleNarrativeReviewBody: {
				endDate: endDate.toISOString(),
				elementIds
			}
		})
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []))
		.then(toMap);
};

const useReviewApps = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ endDate, elementIds }: { endDate: Date; elementIds: number[] }) =>
			reviewApps({ endDate, elementIds }),
		{
			onSuccess: (data, variables) => {
				queryClient.setQueriesData(['managementApps'], old =>
					old instanceof Map ? new Map(old.set(variables, data)) : data
				);
				queryClient.invalidateQueries(['app-procedures']);
			}
		}
	);
};

export default useReviewApps;
