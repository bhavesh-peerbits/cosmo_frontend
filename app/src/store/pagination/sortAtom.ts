import { atomFamily, DefaultValue } from 'recoil';
import { SortingState } from '@tanstack/react-table';
import { urlSyncEffect } from 'recoil-sync';
import { bool, object, string, writableArray } from '@recoiljs/refine';

const sortAtom = atomFamily<SortingState, string>({
	key: 'paginationSort',
	default: [],
	effects: id => [
		urlSyncEffect({
			itemKey: `sort-${id}`,
			read: ({ read }) => {
				const el = read(`sort-${id}`);
				if (typeof el === 'string') {
					const split = el.split(',');
					return split
						.map(s => {
							const [field, direction] = s.split(':');
							return field
								? {
										id: field,
										desc: direction === 'desc'
								  }
								: undefined;
						})
						.filter(Boolean);
				}
				return [];
			},
			write: ({ write, reset }, newValue) => {
				if (newValue instanceof DefaultValue || newValue.length === 0) {
					reset(`sort-${id}`);
				} else {
					write(
						`sort-${id}`,
						newValue.map(s => `${s.id}${s.desc ? ':desc' : ''}`).join(',')
					);
				}
			},
			refine: writableArray(
				object({
					id: string(),
					desc: bool()
				})
			)
		})
	]
});

export default sortAtom;
