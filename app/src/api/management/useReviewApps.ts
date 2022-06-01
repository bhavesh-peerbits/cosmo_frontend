import api from '@api';
import Application, { fromApplicationApi } from '@model/Application';
import { useMutation, useQueryClient } from 'react-query';

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
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []));
};

const useReviewApps = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ endDate, elementIds }: { endDate: Date; elementIds: number[] }) =>
			reviewApps({ endDate, elementIds }),
		{
			onSuccess: (data, variables) => {
				variables.elementIds.forEach(id =>
					queryClient.setQueriesData(['managementApps', id], old =>
						(old as Map<string, Application>).get(id.toString())
					)
				);
				queryClient.invalidateQueries(['app-procedures']);
			}
		}
	);
};

export default useReviewApps;
