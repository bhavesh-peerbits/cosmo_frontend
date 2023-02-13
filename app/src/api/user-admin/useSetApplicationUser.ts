import api from '@api';
import ApplicationUser, {
	fromApplicationUserApi,
	toApplicationUserApi
} from '@model/Narrative/ApplicationUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SetApplicationUserParams {
	appId: string;
	appUserData: ApplicationUser;
}

const setApplicationUser = ({ appId, appUserData }: SetApplicationUserParams) => {
	return api.userAdminApi
		.setApplicationUser({
			appId: +appId,
			applicationUserDto: toApplicationUserApi(appUserData)
		})
		.then(({ data }) => fromApplicationUserApi(data));
};

const useSetApplicationUser = () => {
	const queryClient = useQueryClient();
	return useMutation(setApplicationUser, {
		onSuccess: () => {
			queryClient.invalidateQueries(['applicationUsers']);
		}
	});
};

export default useSetApplicationUser;
