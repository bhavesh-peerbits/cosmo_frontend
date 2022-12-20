import { atomFamily } from 'recoil';

const filterAtom = atomFamily<Record<string, string | number | boolean>, string>({
	key: 'paginationFilter',
	default: {}
});

export default filterAtom;
