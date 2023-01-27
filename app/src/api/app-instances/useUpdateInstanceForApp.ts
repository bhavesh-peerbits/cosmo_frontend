import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Instance, { fromInstanceApi, toInstanceApi } from '@model/Instance';

interface UpdateInstanceForAppParams {
	appId: string;
	instance: Instance;
}

const updateInstanceForApp = ({ appId, instance }: UpdateInstanceForAppParams) => {
	return api.applicationApi
		.updateInstanceForApplication({
			appId: +appId,
			instanceId: +instance.id,
			instanceDto: toInstanceApi(instance)
		})
		.then(({ data }) => fromInstanceApi(data));
};

const useUpdateInstanceForApp = () => {
	const queryClient = useQueryClient();
	return useMutation(updateInstanceForApp, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['instances-app', variables.appId]);
		}
	});
};

export default useUpdateInstanceForApp;
