/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import usePaginationStore from '@hooks/pagination/usePaginationStore';
import { OpenApiPagination } from '@exportabletypes/pagination';

type QueryKey = (string | number | string[])[];

interface PaginationData {
	last?: boolean;
	totalElements?: number;
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

	// const normalizeFilter = useCallback((v: { id: string; value: unknown }) => {
	// 	let filter = '';
	// 	if (isArray(v.value)) {
	// 		// @ts-ignore
	// 		const [min, max] = v.value;
	// 		filter = min !== undefined ? `${v.id}>=${min},` : '';
	// 		filter += max !== undefined ? `${v.id}<=${max}` : '';
	// 	} else {
	// 		filter = `${v.id}:${v.value},`;
	// 	}
	// 	return filter;
	// }, []);

	// const filterNormalize = useMemo(
	// 	() =>
	// 		columnFiltersState.length > 0
	// 			? columnFiltersState.map(normalizeFilter).join('')
	// 			: undefined,
	// 	[columnFiltersState, normalizeFilter]
	// );

	const query = useQuery(
		[
			...key,
			pageIndex,
			pageSize,
			sortNormalize,
			JSON.stringify(columnFiltersState) ?? ''
		],
		() =>
			fetchFn({
				page: pageIndex,
				size: pageSize,
				sort: sortNormalize,
				filter: columnFiltersState
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
				[
					...key,
					nextPage,
					pageSize,
					sortNormalize,
					JSON.stringify(columnFiltersState) ?? ''
				],
				() =>
					fetchFn({
						page: nextPage,
						size: pageSize,
						sort: sortNormalize,
						filter: columnFiltersState
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
		columnFiltersState
	]);

	return query;
};

export default useQueryPagination;
