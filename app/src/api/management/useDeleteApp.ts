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
				Array.isArray(old) ? [...old.filter(({ id }) => id !== params.appId)] : undefined
			);
			queryClient.removeQueries(['managementApps', params.appId]);
		}
	});
};

export default useDeleteApp;
