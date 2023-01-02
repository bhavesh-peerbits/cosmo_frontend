import { useRecoilState, useResetRecoilState } from 'recoil';
import { useCallback } from 'react';
import sortAtom from '@store/pagination/sortAtom';
import paginationAtom from '@store/pagination/paginationAtom';
import statusAtom from '@store/pagination/paginationStatusAtom';
import filterAtom from '@store/pagination/filterAtom';

const usePaginationStore = (id: string) => {
	const [pagination, setPagination] = useRecoilState(paginationAtom(id));
	const [sorting, setSorting] = useRecoilState(sortAtom(id));
	const [status, setStatus] = useRecoilState(statusAtom(id));
	const [columnFiltersState, setColumnFilters] = useRecoilState(filterAtom(id));
	const resetPaginationRecoil = useResetRecoilState(paginationAtom(id));
	const resetSortRecoil = useResetRecoilState(sortAtom(id));
	const resetFilter = useResetRecoilState(filterAtom(id));

	const resetPagination = useCallback(() => {
		resetPaginationRecoil();
		resetSortRecoil();
		resetFilter();
	}, [resetFilter, resetPaginationRecoil, resetSortRecoil]);

	return {
		sorting,
		pagination,
		columnFiltersState,
		status,
		setPagination,
		setSorting,
		setStatus,
		setColumnFilters,
		resetPagination
	};
};

export default usePaginationStore;
