import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Application, { fromApplicationApi, toApplicationApi } from '@model/Application';

interface CreateAppParams {
	appData: Application;
}

const createApp = ({ appData }: CreateAppParams) => {
	return api.applicationApi
		.createApplication({ applicationDto: toApplicationApi(appData) })
		.then(({ data }) => fromApplicationApi(data));
};

const useEditApp = () => {
	const queryClient = useQueryClient();
	return useMutation(createApp, {
		onSuccess: data => {
			queryClient.setQueriesData(
				{
					predicate: ({ queryKey }) =>
						(queryKey.length === 1 && queryKey[0] === 'managementApps') ||
						(queryKey[0] === 'managementApps' && queryKey[1] === data.id)
				},
				old => (old instanceof Map ? new Map(old.set(data.id, data)) : data)
			);
		}
	});
};

export default useEditApp;
