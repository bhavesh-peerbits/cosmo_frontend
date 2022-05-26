/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import Review from '@model/Review';
import { GetRecoilType } from '@store/util';

type Filters = {
	query: string | undefined;
	owner: string[];
	startDate: string | undefined;
	dueDate: number | undefined;
};

const reviewFilters = atom<Filters>({
	key: 'reviewFilters',
	default: {
		query: '',
		owner: [],
		startDate: undefined,
		dueDate: undefined
	}
});

const reviewApps = atom<Review[]>({
	key: 'reviewApps',
	default: []
});

const prepareDateFilter = (
	apps: GetRecoilType<typeof reviewApps>,
	filters: GetRecoilType<typeof reviewFilters>,
	filterName: 'startDate' | 'dueDate'
) => {
	return (
		(apps.map(app => app[filterName]).filter(l => !!l) as Date[])
			.map(date => ({ date, time: date.getMonth() / date.getFullYear() }))
			// sort in ascending order by time
			.sort((a, b) => a.time - b.time)
			.map(({ date, time }) => ({
				date: time,
				value: `${date.getMonth() + 1}/${date.getFullYear()}`,
				enabled: (filters[filterName] === time || filters[filterName]) === ''
			}))
			// remove duplicates
			.filter((o, index, array) => array.findIndex(t => t.value === o.value) === index)
			// sort in descending order by time
			.reverse()
	);
};

const applyFilters = (
	apps: GetRecoilType<typeof reviewApps>,
	filters: GetRecoilType<typeof reviewFilters>
) => {
	const filteredApps = apps
		// filter by query term string
		.filter(app =>
			filters.query
				? app.name?.toLowerCase()?.trim()?.includes(filters.query.toLowerCase().trim())
				: true
		)

		// filter by owner
		.filter(app =>
			filters.owner.length
				? filters.owner.some(
						owner => app.owner.name?.toLowerCase() === owner.toLowerCase()
				  )
				: true
		)
		// filter by start date
		.filter(app =>
			filters.startDate
				? filters.startDate === 'never'
					? app.startDate === undefined
					: app.startDate
				: true
		)
		// filter due date
		.filter(app =>
			filters.dueDate
				? app.dueDate &&
				  app.dueDate.getMonth() / app.dueDate.getFullYear() === filters.dueDate
				: true
		);

	return filteredApps;
};

const filteredApplications = selector({
	key: 'filteredReview',
	get: ({ get }) => {
		const filters = get(reviewFilters);
		const apps = get(reviewApps);
		return {
			apps: applyFilters(apps, filters),
			startDate: prepareDateFilter(apps, filters, 'startDate'),
			dueDate: prepareDateFilter(apps, filters, 'dueDate'),
			owner: [
				...new Set(apps.map(app => app.owner.name).filter(o => !!o) as string[])
			].map(owner => ({
				owner,
				enabled: filters.owner.includes(owner ?? '')
			}))
		};
	}
});

export { reviewFilters, reviewApps, filteredApplications };
