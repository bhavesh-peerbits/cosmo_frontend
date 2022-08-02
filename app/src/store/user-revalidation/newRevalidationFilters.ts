/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';

type Filters = {
	type: string[] | undefined;
	layer: string[] | undefined;
	query: string | undefined;
};
type Revalidation = {
	id: string;
	name: string;
	layer?: string;
	type?: string;
};

const newRevalidationFilters = atom<Filters>({
	key: 'newRevalidationFilters',
	default: {
		type: [],
		layer: [],
		query: ''
	}
});

const revalidationsList = atom<Revalidation[]>({
	key: 'revalidations',
	default: []
});

const applyFilters = (
	revalidations: GetRecoilType<typeof revalidationsList>,
	filters: GetRecoilType<typeof newRevalidationFilters>
) => {
	const filteredRevalidations = revalidations
		// filter by query term string
		.filter(revalidation =>
			filters.query
				? revalidation.name
						?.toLowerCase()
						?.trim()
						?.includes(filters.query.toString().toLowerCase().trim())
				: true
		);

	return (
		filteredRevalidations
			// filter by type
			.filter(revalidation =>
				filters.type?.length
					? filters.type.some(
							type => revalidation.type?.toLowerCase() === type.toLowerCase()
					  )
					: true
			)
			// filter by layer
			.filter(revalidation =>
				filters.layer?.length
					? filters.layer.some(
							layer => revalidation.layer?.toLowerCase() === layer.toLowerCase()
					  )
					: true
			)
	);
};

const filteredRevalidations = selector({
	key: 'filteredRevalidations',
	get: ({ get }) => {
		const filters = get(newRevalidationFilters);
		const revalidations = get(revalidationsList);
		return {
			revalidations: applyFilters(revalidations, filters),
			type: [
				...new Set(
					revalidations
						.map(revalidation => revalidation.type)
						.filter(t => !!t) as string[]
				)
			].map(type => ({
				type,
				enabled: filters.type?.includes(type ?? '')
			})),
			layer: [
				...new Set(
					revalidations
						.map(revalidation => revalidation.layer)
						.filter(l => !!l) as string[]
				)
			].map(layer => ({
				layer,
				enabled: filters.layer?.includes(layer ?? '')
			}))
		};
	}
});

export { newRevalidationFilters, revalidationsList, filteredRevalidations };
