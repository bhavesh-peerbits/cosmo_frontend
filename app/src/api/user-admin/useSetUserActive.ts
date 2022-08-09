import api from '@api';
import { useMutation, useQueryClient } from 'react-query';

const setUserActive = (userId: string) => {
	return api.userAdminApi.setUserActive({ userId });
};

const useSetUserActive = () => {
	const queryClient = useQueryClient();
	return useMutation(({ userId }: { userId: string }) => setUserActive(userId), {
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
			queryClient.invalidateQueries(['applicationUsers']);
			queryClient.invalidateQueries(['analystUsers']);
		}
	});
};

export default useSetUserActive;
