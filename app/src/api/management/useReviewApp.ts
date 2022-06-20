import api from '@api';
import { fromApplicationApi } from '@model/Application';
import { useMutation, useQueryClient } from 'react-query';
import formatIso from 'date-fns/formatISO';

interface ReviewAppParams {
	appId: string;
	endDate: Date;
}

const reviewApp = ({ appId, endDate }: ReviewAppParams) => {
	return api.narrativeReview
		.startReviewOfAnApplication({
			id: +appId,
			narrativeReviewBody: { endDate: formatIso(endDate, { representation: 'date' }) }
		})
		.then(({ data }) => fromApplicationApi(data));
};

const useReviewApp = (appId: string) => {
	const queryClient = useQueryClient();
	return useMutation(({ endDate }: { endDate: Date }) => reviewApp({ appId, endDate }), {
		onSuccess: data => {
			queryClient.setQueriesData(['managementApps'], old =>
				old instanceof Map ? new Map(old.set(appId, data)) : data
			);
			queryClient.invalidateQueries(['app-procedures']);
		}
	});
};

export default useReviewApp;
