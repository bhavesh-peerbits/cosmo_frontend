/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import Review from '@model/Review';
import { GetRecoilType } from '@store/util';
import { formatDate } from '@i18n';

type Filters = {
	query: string | undefined;
	analyst: string[];
	startDate: string | undefined;
};

const reviewFilters = atom<Filters>({
	key: 'reviewFilters',
	default: {
		query: '',
		analyst: [],
		startDate: undefined
	}
});

const reviewApps = atom<Review[]>({
	key: 'reviewApps',
	default: []
});

const prepareDateFilter = (
	apps: GetRecoilType<typeof reviewApps>,
	filters: GetRecoilType<typeof reviewFilters>,
	filterName: 'startDate'
) => {
	return (
		(apps.map(app => app[filterName]).filter(l => !!l) as Date[])
			.map(date => ({ date, time: date.getTime() }))
			// sort in ascending order by time
			.sort((a, b) => a.time - b.time)
			.map(({ date, time }) => ({
				date: time,
				value: formatDate(date),
				enabled: filters[filterName] === 'in-progress'
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
				? app.applicationName
						?.toLowerCase()
						?.trim()
						?.includes(filters.query.toLowerCase().trim())
				: true
		)

		// filter by analyst
		.filter(app =>
			filters.analyst.length
				? filters.analyst.some(
						analyst => app.analyst?.toLowerCase() === analyst.toLowerCase()
				  )
				: true
		)
		.filter(app =>
			filters.startDate
				? filters.startDate === 'never'
					? app.startDate === undefined
					: app.startDate
				: true
		);

	return filteredApps;
};

const filteredApplications = selector({
	key: 'filteredApplications',
	get: ({ get }) => {
		const filters = get(reviewFilters);
		const apps = get(reviewApps);
		return {
			apps: applyFilters(apps, filters),
			startDate: prepareDateFilter(apps, filters, 'startDate'),
			analyst: [
				...new Set(apps.map(app => app.analyst).filter(o => !!o) as string[])
			].map(analyst => ({
				analyst,
				enabled: filters.analyst.includes(analyst ?? '')
			}))
		};
	}
});

export { reviewFilters, reviewApps, filteredApplications };
