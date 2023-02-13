import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromApplicationApi } from '@model/Narrative/Application';

const useGetUserAppVisibility = (userId: string) => {
	return api.userAdminApi
		.getApplicationVisibilityOfUser({ id: userId })
		.then(({ data }) => (data ? [...data].map(fromApplicationApi) : []));
};

export default (userId: string) =>
	useQuery(['app-user-visibility', userId], () => useGetUserAppVisibility(userId));
