import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const setUserActive = (userId: string) => {
	return api.userAdminApi.setUserActive({ userId });
};

const useSetUserActive = () => {
	const queryClient = useQueryClient();
	return useMutation(({ userId }: { userId: string }) => setUserActive(userId), {
		onSuccess: () => {
			queryClient.invalidateQueries(['allUsers']);
			queryClient.invalidateQueries(['applicationUsers']);
			queryClient.invalidateQueries(['analystUsers']);
		}
	});
};

export default useSetUserActive;
