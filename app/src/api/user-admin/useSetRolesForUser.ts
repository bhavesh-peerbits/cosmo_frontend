import api from '@api';
import User, { fromUserApi } from '@model/User';
import { useMutation, useQueryClient } from 'react-query';

interface SetRolesForUserParams {
	userId: string;
	userData: User;
}

const setRolesForUser = ({ userId, userData }: SetRolesForUserParams) => {
	return api.userAdminApi
		.setRolesForUser({ userId, userDto: userData })
		.then(({ data }) => fromUserApi(data));
};

const useSetRolesForUser = () => {
	const queryClient = useQueryClient();
	return useMutation(setRolesForUser, {
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
			queryClient.invalidateQueries(['applicationUsers']);
			queryClient.invalidateQueries(['analystUsers']);
		}
	});
};

export default useSetRolesForUser;
