import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface CreateDraftParams {
	name: string;
	type: boolean;
	copyMonitoringId?: number;
}

const createDraftMonitoring = ({ name, type, copyMonitoringId }: CreateDraftParams) => {
	return api.analystChangeMonitoringControllerApi
		.createDraft({
			createMonitoringDto: { name, type, copyMonitoringId }
		})

		.then(({ data }) => data);
};

const useCreateDraftMonitoring = () => {
	const queryClient = useQueryClient();
	return useMutation(createDraftMonitoring, {
		onSuccess: () => {
			queryClient.invalidateQueries(['all-monitoring-drafts']);
		}
	});
};

export default useCreateDraftMonitoring;
