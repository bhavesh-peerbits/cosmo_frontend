/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import Review from '@model/Review';
import { GetRecoilType } from '@store/util';

type Filters = {
	query: string | undefined;
	analyst: string[];
};

const reviewFilters = atom<Filters>({
	key: 'reviewFilters',
	default: {
		query: '',
		analyst: []
	}
});

const reviewApps = atom<Review[]>({
	key: 'reviewApps',
	default: []
});

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
