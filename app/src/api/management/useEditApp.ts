import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import Application, { fromApplicationApi, toApplicationApi } from '@model/Application';

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
		.then(({ data }) => fromApplicationApi(data));
};

const useEditApp = () => {
	const queryClient = useQueryClient();
	return useMutation(editApp, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(['managementApps'], old =>
				Array.isArray(old) ? old.map(a => (a.id !== variables.appId ? a : data)) : data
			);
		}
	});
};

export default useEditApp;
