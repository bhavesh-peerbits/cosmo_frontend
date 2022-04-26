import { atom, selector } from 'recoil';
import Application from '@model/Application';

type Filters = {
	categories: string[];
	query: string | undefined;
	isTile: boolean | undefined;
};

const managementFilters = atom<Filters>({
	key: 'managementFilters',
	default: {
		categories: [],
		query: '',
		isTile: true
	}
});

const managementApps = atom<Application[]>({
	key: 'managementApps',
	default: []
});

const filteredApplications = selector({
	key: 'filteredApplications',
	get: ({ get }) => {
		const filters = get(managementFilters);
		const apps = get(managementApps);
		return {
			apps: apps
				.filter(app =>
					filters.isTile && filters.categories.length > 0
						? filters.categories.some(
								category => app.category.toLowerCase() === category.toLowerCase()
						  )
						: true
				)
				.filter(app =>
					filters.query
						? app.name
								?.toLowerCase()
								?.trim()
								?.includes(filters.query.toLowerCase().trim())
						: true
				),
			categories: [...new Set(apps.map(a => a.category))].map(category => ({
				category,
				enabled: filters.categories.includes(category)
			}))
		};
	}
});

export { managementFilters, managementApps, filteredApplications };
