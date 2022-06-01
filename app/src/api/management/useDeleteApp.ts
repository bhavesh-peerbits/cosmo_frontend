import api from '@api';
import { useMutation, useQueryClient } from 'react-query';

interface DeleteAppParams {
	appId: string;
}

const deleteApp = ({ appId }: DeleteAppParams) => {
	return api.applicationApi.deleteApplication({ id: +appId });
};

const useDeleteApp = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteApp, {
		onSuccess: (_data, params) => {
			queryClient.setQueriesData(['managementApps'], old =>
				old instanceof Map ? old.delete(params.appId) && new Map(old) : undefined
			);
			queryClient.removeQueries(['managementApps', params.appId]);
			queryClient.removeQueries(['appChanges', params.appId]);
		}
	});
};

export default useDeleteApp;
