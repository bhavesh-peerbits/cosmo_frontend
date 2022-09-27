import { useMutation, useQueryClient } from 'react-query';
import api from '@api';
import { UserBase } from 'cosmo-api/src/v1/models';
import { fromUserApi } from '@model/User';

interface AddUserParams {
	userData: UserBase;
}

const addUser = ({ userData }: AddUserParams) => {
	return api.userAdminApi
		.addUser({ userBase: userData })
		.then(({ data }) => fromUserApi(data));
};

const useAddUser = () => {
	const queryClient = useQueryClient();
	return useMutation(addUser, {
		onSuccess: () => {
			queryClient.invalidateQueries(['allUsers']);
		}
	});
};

export default useAddUser;
