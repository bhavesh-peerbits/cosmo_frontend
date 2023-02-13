import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import { formatDate } from '@i18n';
import ApplicationWithCampaigns from '@model/UserRevalidation/ApplicationWithCampaigns';

type Filters = {
	dueDate: number | undefined;
	type: string[] | undefined;
	status: string[] | undefined;
	query: string | undefined;
};

const newRevalidationReviewFilters = atom<Filters>({
	key: 'newRevalidationReviewFilters',
	default: {
		dueDate: undefined,
		type: [],
		status: [],
		query: ''
	}
});

const revalidationsReviewList = atom<ApplicationWithCampaigns[]>({
	key: 'revalidationsReview',
	default: []
});

const applyFilters = (
	revalidations: GetRecoilType<typeof revalidationsReviewList>,
	filters: GetRecoilType<typeof newRevalidationReviewFilters>
) => {
	const filteredRevalidations = revalidations
		// filter by query term string
		.filter(revalidation =>
			filters.query
				? revalidation.application.name
						?.toLowerCase()
						?.trim()
						?.includes(filters.query.toString().toLowerCase().trim())
				: true
		);

	return (
		filteredRevalidations
			// filter by type
			.map(revalidation => ({
				...revalidation,
				campaigns: revalidation.campaigns.filter(rev =>
					filters.type?.length
						? filters.type.some(type => rev.type?.toLowerCase() === type.toLowerCase())
						: true
				)
			}))
			.map(revalidation => ({
				...revalidation,
				campaigns: revalidation.campaigns
					// filter by status
					.filter(rev =>
						filters.status?.length
							? filters.status.some(
									status => rev.status?.toLowerCase() === status.toLowerCase()
							  )
							: true
					)
			}))
			.map(revalidation => ({
				...revalidation,
				campaigns: revalidation.campaigns
					// filter by status
					.filter(app =>
						filters.dueDate
							? app.dueDate && app.dueDate.getTime() >= filters.dueDate
							: true
					)
			}))
			.filter(app => app.campaigns.length > 0)
	);
};

const filteredRevalidationsReview = selector({
	key: 'filteredRevalidationsReview',
	get: ({ get }) => {
		const filters = get(newRevalidationReviewFilters);
		const revalidations = get(revalidationsReviewList);
		return {
			revalidations: applyFilters(revalidations, filters),
			type: [
				...new Set(
					revalidations
						.flatMap(revalidation => revalidation.campaigns.map(rev => rev.type))
						.filter(t => !!t) as string[]
				)
			].map(type => ({
				type,
				enabled: filters.type?.includes(type ?? '')
			})),
			status: [
				...new Set(
					revalidations
						.flatMap(revalidation => revalidation.campaigns.map(c => c.status))
						.filter(l => !!l) as string[]
				)
			].map(status => ({
				status,
				enabled: filters.status?.includes(status ?? '')
			})),
			dueDate: (
				revalidations
					.flatMap(app => app.campaigns.map(c => c.dueDate))
					.filter(l => !!l) as Date[]
			)
				.map(date => ({ date, time: date.getTime() }))
				// sort in ascending order by time
				.sort((a, b) => a.time - b.time)
				.map(({ date, time }) => ({
					date: time,
					value: formatDate(date, 'ago'),
					enabled: filters.dueDate === time
				}))
				// remove duplicates
				.filter((o, index, array) => array.findIndex(t => t.value === o.value) === index)
				// sort in descending order by time
				.reverse()
		};
	}
});

export {
	newRevalidationReviewFilters,
	revalidationsReviewList,
	filteredRevalidationsReview
};
