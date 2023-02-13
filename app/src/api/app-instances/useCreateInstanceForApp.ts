import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Instance, { fromInstanceApi, toInstanceApi } from '@model/Narrative/Instance';

interface CreateInstanceForAppParams {
	appId: string;
	instance: Instance;
}

const createInstanceForApp = ({ appId, instance }: CreateInstanceForAppParams) => {
	return api.applicationApi
		.createInstanceForApplication({
			appId: +appId,
			instanceDto: toInstanceApi(instance)
		})
		.then(({ data }) => fromInstanceApi(data));
};

const useCreateInstanceForApp = () => {
	const queryClient = useQueryClient();
	return useMutation(createInstanceForApp, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['instances-app', variables.appId]);
		}
	});
};

export default useCreateInstanceForApp;
