import api from '@api';
import { OpenApiPagination } from '@exportabletypes/pagination';
import useQueryPagination from '@hooks/pagination/useQueryPagination';
import { fromUserApi } from '@model/common/User';

const useGetFilteredPagedUser = (pagination: OpenApiPagination) => {
	return api.userAdminApi
		.getFilteredUser({
			...pagination.filter,
			page: pagination.page,
			size: pagination.size,
			sort: pagination.sort
		})
		.then(({ data }) => ({
			...data,
			content: (data?.content ?? []).map(fromUserApi)
		}));
};

export default (paginationId: string) =>
	useQueryPagination(paginationId, ['filtered-user'], pagination =>
		useGetFilteredPagedUser(pagination)
	);
