import api from '@api';
import { useMutation, useQueryClient } from 'react-query';

const setUserInactive = (userId: string) => {
	return api.userAdminApi.setUserInactive({ userId });
};

const useSetUserInactive = () => {
	const queryClient = useQueryClient();
	return useMutation(({ userId }: { userId: string }) => setUserInactive(userId), {
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
		}
	});
};

export default useSetUserInactive;
