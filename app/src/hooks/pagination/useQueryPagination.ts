import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { useCallback, useEffect, useMemo } from 'react';
import { isArray } from 'lodash';
import usePaginationStore from '@hooks/pagination/usePaginationStore';
import { OpenApiPagination } from '@exportabletypes/pagination';

type QueryKey = (string | number | string[])[];

interface PaginationData {
	last?: boolean;
	totalElements?: number;
}

const valueIsArray = (value: unknown): value is unknown[] => {
	return isArray(value);
}

const useQueryPagination = <T extends PaginationData>(
	paginationId: string,
	key: QueryKey,
	fetchFn: (pagination: OpenApiPagination) => Promise<T>,
	options: Omit<UseQueryOptions<T, unknown, T, QueryKey>, 'queryKey' | 'queryFn'> = {}
) => {
	const { pagination, sorting, columnFiltersState, setStatus } =
		usePaginationStore(paginationId);

	const queryClient = useQueryClient();
	const { pageIndex, pageSize } = pagination;

	const sortNormalize = useMemo(
		() => sorting.map(s => `${s.id.toLowerCase()},${s.desc ? 'desc' : 'asc'},ignorecase`),
		[sorting]
	);

	const normalizeFilter = useCallback((v: { id: string; value: unknown }) => {
		const filter = {} as Record<string, unknown | unknown[]>;
		if (valueIsArray(v.value)) {
			const [min, max] = v.value;
			filter[v.id] = [min, max];
		} else {
			filter[v.id] = v.value;
		}
		return filter;
	}, []);

	const filterNormalize = useMemo(
		() =>
			columnFiltersState.length > 0
				? columnFiltersState
						.map(normalizeFilter)
						.reduce((acc, cur) => ({ ...acc, ...cur }), {})
				: {},
		[columnFiltersState, normalizeFilter]
	);

	const query = useQuery(
		[...key, pageIndex, pageSize, sortNormalize, JSON.stringify(filterNormalize ?? {})],
		() =>
			fetchFn({
				page: pageIndex,
				size: pageSize,
				sort: sortNormalize,
				filter: filterNormalize
			}),
		{
			...options,
			suspense: false,
			keepPreviousData: true,
			staleTime: 2 * 60 * 1000
		}
	);
	const { data, isPreviousData, isFetching } = query;
	useEffect(() => {
		setStatus({
			isLoading: isFetching,
			total: data?.totalElements
		});
	}, [data?.totalElements, isFetching, setStatus]);

	useEffect(() => {
		if (data && !isPreviousData && !data.last) {
			const nextPage = pageIndex + 1;
			queryClient.prefetchQuery(
				[...key, nextPage, pageSize, sortNormalize, filterNormalize ?? ''],
				() =>
					fetchFn({
						page: nextPage,
						size: pageSize,
						sort: sortNormalize,
						filter: filterNormalize
					}),
				{
					staleTime: 2 * 60 * 1000
				}
			);
		}
	}, [
		fetchFn,
		key,
		pageIndex,
		pagination,
		data,
		queryClient,
		pageSize,
		isPreviousData,
		sortNormalize,
		filterNormalize
	]);

	return query;
};

export default useQueryPagination;
