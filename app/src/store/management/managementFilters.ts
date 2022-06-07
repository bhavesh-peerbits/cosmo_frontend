/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import Application from '@model/Application';
import { formatDate } from '@i18n';
import { GetRecoilType } from '@store/util';

type Filters = {
	lastReview: number | 'never' | undefined;
	lastModify: number | undefined;
	owner: string[];
	query: string | undefined;
	isTile: boolean | undefined;
};

const managementFilters = atom<Filters>({
	key: 'managementFilters',
	default: {
		lastReview: undefined,
		lastModify: undefined,
		owner: [],
		query: '',
		isTile: true
	}
});

const managementApps = atom<Application[]>({
	key: 'managementApps',
	default: []
});

const prepareDateFilter = (
	apps: GetRecoilType<typeof managementApps>,
	filters: GetRecoilType<typeof managementFilters>,
	filterName: 'lastReview' | 'lastModify'
) => {
	return (
		(apps.map(app => app[filterName]).filter(l => !!l) as Date[])
			.map(date => ({ date, time: date.getTime() }))
			// sort in ascending order by time
			.sort((a, b) => a.time - b.time)
			.map(({ date, time }) => ({
				date: time,
				value: formatDate(date, 'ago'),
				enabled: filters[filterName] === time
			}))
			// remove duplicates
			.filter((o, index, array) => array.findIndex(t => t.value === o.value) === index)
			// sort in descending order by time
			.reverse()
	);
};

const applyFilters = (
	apps: GetRecoilType<typeof managementApps>,
	filters: GetRecoilType<typeof managementFilters>
) => {
	const filteredApps = apps
		// filter by query term string
		.filter(app =>
			filters.query
				? app.name?.toLowerCase()?.trim()?.includes(filters.query.toLowerCase().trim())
				: true
		);

	if (filters.isTile !== false) {
		// filter by last review date
		return (
			filteredApps
				.filter(app =>
					filters.lastReview
						? filters.lastReview === 'never'
							? app.lastReview === undefined
							: app.lastReview && app.lastReview.getTime() >= filters.lastReview
						: true
				)
				// filter by last modify date
				.filter(app =>
					filters.lastModify
						? app.lastModify && app.lastModify.getTime() >= filters.lastModify
						: true
				)
				// filter by owner
				.filter(app =>
					filters.owner.length
						? filters.owner.some(
								owner => app.owner.displayName?.toLowerCase() === owner.toLowerCase()
						  )
						: true
				)
		);
	}
	return filteredApps;
};

const filteredApplications = selector({
	key: 'filteredApplications',
	get: ({ get }) => {
		const filters = get(managementFilters);
		const apps = get(managementApps);
		return {
			apps: applyFilters(apps, filters),
			lastModify: prepareDateFilter(apps, filters, 'lastModify'),
			lastReview: prepareDateFilter(apps, filters, 'lastReview'),
			owner: [
				...new Set(apps.map(app => app.owner.displayName).filter(o => !!o) as string[])
			].map(owner => ({
				owner,
				enabled: filters.owner.includes(owner ?? '')
			}))
		};
	}
});

export { managementFilters, managementApps, filteredApplications };
