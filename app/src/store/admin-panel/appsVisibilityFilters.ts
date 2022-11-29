/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import Application from '@model/Application';

type Filters = {
	query: string | undefined;
	tab?: number;
};

const appsVisibilityFilters = atom<Filters>({
	key: 'appsVisibilityFilters',
	default: {
		query: '',
		tab: undefined
	}
});

const appsList = atom<Application[]>({
	key: 'apps',
	default: []
});

const applyFilters = (
	apps: GetRecoilType<typeof appsList>,
	filters: GetRecoilType<typeof appsVisibilityFilters>
) => {
	const filteredApps = apps
		// filter by query term string
		.filter(app =>
			filters.query
				? app.name
						?.toLowerCase()
						?.trim()
						?.includes(filters.query.toString().toLowerCase().trim())
				: true
		);
	return filteredApps;
};

const filteredApplications = selector({
	key: 'filteredApps',
	get: ({ get }) => {
		const filters = get(appsVisibilityFilters);
		const apps = get(appsList);
		return {
			apps: applyFilters(apps, filters)
		};
	}
});

export { appsVisibilityFilters, appsList, filteredApplications };
