import { useRecoilState, useResetRecoilState } from 'recoil';
import { useCallback } from 'react';
import paginationAtom from '@store/pagination/paginationAtom';
import statusAtom from '@store/pagination/paginationStatusAtom';
import sortAtom from '@store/pagination/sortAtom';

const usePaginationStore = (id: string) => {
	const [pagination, setPagination] = useRecoilState(paginationAtom(id));
	const [sorting, setSorting] = useRecoilState(sortAtom(id));
	const [status, setStatus] = useRecoilState(statusAtom(id));
	const resetPaginationRecoil = useResetRecoilState(paginationAtom(id));
	const resetSortRecoil = useResetRecoilState(sortAtom(id));

	const resetPagination = useCallback(() => {
		resetPaginationRecoil();
		resetSortRecoil();
	}, [resetPaginationRecoil, resetSortRecoil]);

	return {
		sorting,
		pagination,
		status,
		setPagination,
		setSorting,
		setStatus,
		resetPagination
	};
};

export default usePaginationStore;
