import { atomFamily } from 'recoil';

type PaginationStatus = {
	isLoading: boolean;
	total: number | undefined;
};

const statusAtom = atomFamily<PaginationStatus | undefined, string>({
	key: 'paginationState',
	default: undefined
});

export default statusAtom;
