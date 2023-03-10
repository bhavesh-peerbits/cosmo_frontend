import api from '@api';
import Application, { toApplicationApi } from '@model/Narrative/Application';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SetUserApplicationParams {
	userId: string;
	applications: Application[];
}

const setUserApplication = ({ userId, applications }: SetUserApplicationParams) => {
	return api.userAdminApi.setUserAppVisibility({
		userApplicationDto: {
			applications: applications.map(toApplicationApi),
			userId
		}
	});
};

const useSetUserApplication = () => {
	const queryClient = useQueryClient();
	return useMutation(setUserApplication, {
		onSuccess: () => {
			queryClient.removeQueries(['app-user-visibility']);
		}
	});
};

export default useSetUserApplication;
