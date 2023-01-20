import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromUserApi } from '@model/User';

const useGetAllAnalystUsers = () => {
	return api.userAdminApi.getAllAnalystUsers().then(({ data }) => data.map(fromUserApi));
};

export default () => useQuery(['analystUsers'], useGetAllAnalystUsers);
