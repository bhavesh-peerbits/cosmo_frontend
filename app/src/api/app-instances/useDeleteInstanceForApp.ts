import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteInstanceForAppParams {
	appId: string;
	instanceId: string;
}

const deleteInstanceForApp = ({ appId, instanceId }: DeleteInstanceForAppParams) => {
	return api.applicationApi.deleteInstanceForApplication({
		appId: +appId,
		instanceId: +instanceId
	});
};

const useDeleteInstanceForApp = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteInstanceForApp, {
		onSuccess: (_data, params) => {
			queryClient.invalidateQueries(['instances-app', params.appId]);
		}
	});
};

export default useDeleteInstanceForApp;
