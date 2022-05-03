import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import Application, { toApplicationApi } from '@model/Application';

interface EditAppParams {
	appId: string;
	appData: Application;
}

const editApp = ({ appId, appData }: EditAppParams) => {
	return api.applicationApi
		.updateApplication({
			id: +appId,
			applicationDto: toApplicationApi(appData)
		})
		.then(({ data }) => data);
};

const useEditApp = () => {
	const queryClient = useQueryClient();
	return useMutation(editApp, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(['managementApps', { id: variables.appId }], data);
		}
	});
};

export default useEditApp;
