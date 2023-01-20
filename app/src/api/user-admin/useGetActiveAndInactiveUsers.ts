import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromUserApi } from '@model/User';

const useGetActiveAndInactiveUsers = () => {
	return api.userAdminApi
		.getAllActiveAndInactiveUsers()
		.then(({ data }) => data.map(fromUserApi));
};

export default () => useQuery(['allUsers'], useGetActiveAndInactiveUsers);
