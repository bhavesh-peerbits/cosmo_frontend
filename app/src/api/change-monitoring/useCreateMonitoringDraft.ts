import { useMutation } from '@tanstack/react-query';
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
	return useMutation(createDraftMonitoring);
};

export default useCreateDraftMonitoring;
