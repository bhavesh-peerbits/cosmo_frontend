import { PaginationState } from '@tanstack/react-table';
import { atomFamily, DefaultValue } from 'recoil';
import { urlSyncEffect } from 'recoil-sync';
import { number, object } from '@recoiljs/refine';

const defaultValue: PaginationState = {
	pageSize: 10,
	pageIndex: 0
};

const paginationAtom = atomFamily<PaginationState, string>({
	key: 'pagination',
	default: defaultValue,
	effects: id => [
		urlSyncEffect({
			itemKey: `pag-${id}`,
			read: ({ read }) => {
				const el = read(`pag-${id}`);
				if (typeof el === 'string') {
					const [index, size] = el.split(',').map(Number);
					return {
						pageIndex:
							Number.isInteger(index) && index > 0 ? index - 1 : defaultValue.pageIndex,
						pageSize: Number.isInteger(size) && size >= 0 ? size : defaultValue.pageSize
					};
				}
				return defaultValue;
			},
			write: ({ write, reset }, newValue) => {
				if (
					newValue instanceof DefaultValue ||
					(newValue.pageSize === defaultValue.pageSize &&
						newValue.pageIndex === defaultValue.pageIndex)
				) {
					reset(`pag-${id}`);
				} else {
					write(`pag-${id}`, `${newValue.pageIndex + 1},${newValue.pageSize}`);
				}
			},
			refine: object({
				pageSize: number(),
				pageIndex: number()
			})
		})
	]
});

export default paginationAtom;
