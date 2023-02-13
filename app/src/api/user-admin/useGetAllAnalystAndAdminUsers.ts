import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromUserApi } from '@model/common/User';

const useGetAllAnalystUsers = () => {
	return api.userAdminApi
		.getAllAnalystAndAdminUsers()
		.then(({ data }) => data.map(fromUserApi));
};

export default () => useQuery(['analystUsers'], useGetAllAnalystUsers);
