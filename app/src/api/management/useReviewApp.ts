import api from '@api';
import { fromApplicationApi } from '@model/Narrative/Application';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import formatIso from 'date-fns/formatISO';

interface ReviewAppParams {
	appId: string;
	endDate: Date;
}

const reviewApp = ({ appId, endDate }: ReviewAppParams) => {
	return api.narrativeReview
		.startReviewOfAnApplication({
			appId: +appId,
			narrativeReviewBody: { endDate: formatIso(endDate, { representation: 'date' }) }
		})
		.then(({ data }) => fromApplicationApi(data));
};

const useReviewApp = (appId: string) => {
	const queryClient = useQueryClient();
	return useMutation(({ endDate }: { endDate: Date }) => reviewApp({ appId, endDate }), {
		onSuccess: data => {
			queryClient.setQueriesData(
				{
					predicate: ({ queryKey }) =>
						(queryKey.length === 1 && queryKey[0] === 'managementApps') ||
						(queryKey[0] === 'managementApps' && queryKey[1] === appId)
				},
				old => (old instanceof Map ? new Map(old.set(appId, data)) : data)
			);
			queryClient.invalidateQueries(['app-procedures']);
			queryClient.invalidateQueries(['reviewApps']);
			queryClient.invalidateQueries(['review-procedures']);
		}
	});
};

export default useReviewApp;
