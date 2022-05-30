import { useMutation, useQueryClient } from 'react-query';
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
			queryClient.setQueriesData(['managementApps'], old =>
				old instanceof Map ? new Map(old.set(data.id, data)) : data
			);
		}
	});
};

export default useEditApp;
