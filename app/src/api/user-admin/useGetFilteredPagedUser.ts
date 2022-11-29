import api from '@api';
import { fromUserApi } from '@model/User';
import { useQuery } from 'react-query';

const useGetFilteredPagedUser = (searchField: string, page: number, size: number) => {
	return api.userAdminApi
		.getFilteredUser({ searchField, page, size, sort: ['username'] })
		.then(({ data }) => ({
			...data,
			content: (data?.content ?? []).map(fromUserApi)
		}));
};

export default (searchField: string, page: number, size: number) =>
	useQuery(['filtered-user', searchField, page, size], () =>
		useGetFilteredPagedUser(searchField, page, size)
	);
