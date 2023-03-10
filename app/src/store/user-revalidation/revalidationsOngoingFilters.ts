/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import CampaignWithReview from '@model/UserRevalidation/CampaignWithReview';

type Filters = {
	query: string | undefined;
	dueDate: number | undefined;
	layer: string[];
	revalidationType: string[];
	revalidationStatus: string[];
	tab?: number;
};

const revalidationsOngoingFilters = atom<Filters>({
	key: 'revalidationsOngoingFilters',
	default: {
		query: '',
		layer: [],
		revalidationType: [],
		revalidationStatus: [],
		dueDate: undefined,
		tab: undefined
	}
});

const revalidationsOngoing = atom<CampaignWithReview[]>({
	key: 'revalidationsOngoing',
	default: []
});

const prepareDateFilter = (
	revalidations: GetRecoilType<typeof revalidationsOngoing>,
	filters: GetRecoilType<typeof revalidationsOngoingFilters>,
	filterName: 'dueDate'
) => {
	return (
		(
			revalidations
				.map(revalidation => revalidation.campaign[filterName])
				.filter(l => !!l) as Date[]
		)
			.map(date => ({ date, time: date.getMonth() / date.getFullYear() }))
			// sort in ascending order by time
			.sort((a, b) => a.time - b.time)
			.map(({ date, time }) => ({
				date: time,
				value: `${date.getMonth() + 1}/${date.getFullYear()}`,
				enabled: filters[filterName] === time
			}))
			// remove duplicates
			.filter((o, index, array) => array.findIndex(t => t.value === o.value) === index)
			// sort in descending order by time
			.reverse()
	);
};

const applyFilters = (
	revalidations: GetRecoilType<typeof revalidationsOngoing>,
	filters: GetRecoilType<typeof revalidationsOngoingFilters>
) => {
	const filteredRevalidations = revalidations
		.filter(rev => rev.campaign.status !== 'READY_FOR_REVIEW')

		.filter(revalidation =>
			filters.tab
				? `${filters.tab}` === '1'
					? revalidation.campaign.status === 'REVIEW_IN_PROGRESS' ||
					  revalidation.campaign.status === 'WAITING_FOR_DATA'
					: revalidation.campaign.status === 'COMPLETED' ||
					  revalidation.campaign.status === 'COMPLETED_WITH_PARTIAL_ANSWERS' ||
					  revalidation.campaign.status === 'ANNULLED'
				: true
		)

		// filter by query term string
		.filter(revalidation =>
			filters.query
				? `${revalidation.campaign.name}`
						?.toLowerCase()
						?.trim()
						?.includes(`${filters.query}`.toLowerCase().trim())
				: true
		)
		// filter by layer
		.filter(revalidation =>
			filters.layer.length
				? filters.layer.some(
						layer => revalidation.campaign.layer.toLowerCase() === layer.toLowerCase()
				  )
				: true
		)
		// filter by revalidation type
		.filter(revalidation =>
			filters.revalidationType.length
				? filters.revalidationType.some(
						revalidationType =>
							revalidation.campaign.type.toLowerCase() === revalidationType.toLowerCase()
				  )
				: true
		)
		// filter by revalidation type
		.filter(revalidation =>
			filters.revalidationStatus.length
				? filters.revalidationStatus.some(
						revalidationStatus =>
							revalidation.campaign.status?.toLowerCase() ===
							revalidationStatus.toLowerCase()
				  )
				: true
		)
		// filter due date
		.filter(revalidation =>
			filters.dueDate
				? revalidation.campaign.dueDate &&
				  revalidation.campaign.dueDate.getMonth() /
						revalidation.campaign.dueDate.getFullYear() ===
						filters.dueDate
				: true
		);

	return filteredRevalidations;
};

const filteredRevalidationsOngoing = selector({
	key: 'filteredRevalidationsOngoing',
	get: ({ get }) => {
		const filters = get(revalidationsOngoingFilters);
		const revalidations = get(revalidationsOngoing);
		return {
			revalidations: applyFilters(revalidations, filters),
			dueDate: prepareDateFilter(revalidations, filters, 'dueDate'),
			layer: [
				...new Set(
					revalidations
						.map(revalidation => revalidation.campaign.layer)
						.filter(o => !!o) as string[]
				)
			].map(layer => ({
				layer,
				enabled: filters.layer.includes(layer ?? '')
			})),
			revalidationType: [
				...new Set(
					revalidations
						.map(revalidation => revalidation.campaign.type)
						.filter(o => !!o) as string[]
				)
			].map(type => ({
				type,
				enabled: filters.revalidationType.includes(type ?? '')
			})),
			revalidationStatus: [
				...new Set(
					revalidations
						.map(revalidation => revalidation.campaign.status)
						.filter(o => !!o) as string[]
				)
			].map(status => ({
				status,
				enabled: filters.revalidationStatus.includes(status ?? '')
			}))
		};
	}
});

export {
	revalidationsOngoingFilters,
	revalidationsOngoing,
	filteredRevalidationsOngoing
};
