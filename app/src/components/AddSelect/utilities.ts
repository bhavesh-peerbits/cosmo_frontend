import UserProfileImage from '@components/UserProfileImage';
import { ComponentProps, ReactElement } from 'react';

export type ItemElement = {
	sortBy?: ItemType['sortBy'];
	filterBy?: { label: string; attribute: keyof ItemElement['entries'][number] };
	entries: ItemType[];
	modifiers?: {
		label: string;
		options: string[];
	};
};

export interface ItemType {
	id: string;
	title: string;
	subtitle?: string;
	tagInfo?: string;
	icon?: ReactElement;
	avatar?: Omit<ComponentProps<typeof UserProfileImage>, 'size' | 'className'>;
	children?: ItemElement;
	sortBy?: { label: string; attribute: keyof ItemType }[];
	filterBy?: { label: string; attribute: keyof ItemType };
	[key: string]: unknown;
}

export interface ItemNoChildren {
	id: string;
	title: string;
	subtitle?: string;
	tagInfo?: string;
	icon?: ReactElement;
	avatar?: Omit<ComponentProps<typeof UserProfileImage>, 'size' | 'className'>;
	children?: string[];
	sortBy?: { label: string; attribute: keyof ItemType }[];
	filterBy?: { label: string; attribute: keyof ItemType };
	[key: string]: unknown;
}

export type NormalizeItem = {
	parent?: string;
} & ItemNoChildren;

export type GlobalFilter = { id: string; label: string; opts?: unknown[] };

/**
 * used to create a single searchable array of nested items
 * @param {Array} entries - list of entries
 * @returns an array of items
 */
export const flatten: (entries: ItemType[]) => ItemNoChildren[] = (
	entries: ItemType[]
) => {
	return entries.reduce((prev, cur) => {
		const { children, ...item } = cur;
		return prev.concat(item).concat(children ? flatten(children.entries) : []);
	}, [] as ItemNoChildren[]);
};

/**
 * takes in a global filters array and a flat list of items
 * it then searches through the items and finds any with the matching filter properties
 * and adds those values to the array
 * globalFilters looks like [{ id: someProperty }]
 * the returned array would look like [{ id: someProperty, opts: [value, value]}]
 * @param {Array} globalFilters - list of filter properties
 * @param {Array} items - items to search through
 * @returns an array of filter values
 */
export const getGlobalFilterValues = (
	globalFilters: Array<{ id: string; label: string }>,
	items: ItemNoChildren[]
) =>
	globalFilters.reduce((prevFilter, curFilter) => {
		const filterId = curFilter.id;
		const opts = items.reduce((prevItem, curItem) => {
			const value = curItem[filterId];
			if (value && !prevItem.includes(value)) {
				prevItem.push(value);
			}
			return prevItem;
		}, [] as unknown[]);
		prevFilter.push({
			opts,
			...curFilter
		});
		return prevFilter;
	}, [] as GlobalFilter[]);

/**
 * used to normalize nested data into a single object
 * @param {Array} items - list of entries
 * @returns an object of normalized item data
 */
export const normalize: (
	items: ItemElement & { parentId?: string }
) => Record<string, NormalizeItem> = items => {
	const { entries, parentId, sortBy, filterBy } = items;
	return entries.reduce((acc, cur) => {
		const { children, ...entry } = cur;
		acc[cur.id] = { ...entry };
		if (parentId) {
			acc[cur.id].parent = parentId;
		}
		if (sortBy?.length) {
			acc[cur.id].sortBy = sortBy;
		}
		if (filterBy) {
			acc[cur.id].filterBy = filterBy;
		}
		if (children) {
			acc[cur.id].children = children.entries.map(child => child.id);
			const child = normalize({ ...children, parentId: cur.id });
			return { ...acc, ...child };
		}
		return acc;
	}, {} as Record<string, NormalizeItem>);
};

export const sortItems = (attribute: keyof NormalizeItem, direction: 'asc' | 'desc') => {
	return (a: NormalizeItem, b: NormalizeItem) => {
		const valueA = (a[attribute] as string)?.split(' ').join('');
		const valueB = (b[attribute] as string)?.toString()?.split(' ').join('');
		if (direction === 'desc') {
			return valueA > valueB ? -1 : 1;
		}

		return valueA < valueB ? -1 : 1;
	};
};
