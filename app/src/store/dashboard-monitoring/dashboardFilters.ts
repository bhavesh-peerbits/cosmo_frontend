/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { formatDate } from '@i18n';
import { GetRecoilType } from '@store/util';
import Monitoring from '@model/Monitoring';

type Filters = {
	frequency: string[];
	numberOfRun: number[] | undefined;
	startDate: number | undefined;
	endDate: number | undefined;
	currentRun: number[] | undefined;
	tab: number | undefined;
	q: string | undefined;
	isTile: boolean | undefined;
};

const dashboardFilters = atom<Filters>({
	key: 'monitoringDashboardFilters',
	default: {
		frequency: [],
		numberOfRun: [],
		startDate: undefined,
		endDate: undefined,
		currentRun: [],
		tab: undefined,
		isTile: true,
		q: ''
	}
});

const startedMonitorings = atom<Monitoring[]>({
	key: 'startedMonitorings',
	default: []
});

const prepareDateFilter = (
	monitorings: GetRecoilType<typeof startedMonitorings>,
	filters: GetRecoilType<typeof dashboardFilters>,
	filterName: 'startDate' | 'endDate'
) => {
	return (
		(
			monitorings
				.map(monitoring => monitoring.scheduling[filterName])
				.filter(l => !!l) as Date[]
		)
			.map(date => ({ date, time: date.getTime() }))
			// sort in ascending order by time
			.sort((a, b) => a.time - b.time)
			.map(({ date, time }) => ({
				date: time,
				value: formatDate(date),
				enabled: filters[filterName] === time
			}))
			// remove duplicates
			.filter((o, index, array) => array.findIndex(t => t.value === o.value) === index)
			// sort in descending order by time
			.reverse()
	);
};

const applyFilters = (
	monitorings: GetRecoilType<typeof startedMonitorings>,
	filters: GetRecoilType<typeof dashboardFilters>
) => {
	const filteredMonitorings = monitorings
		// filter by query term string
		.filter(monitoring =>
			filters.q
				? monitoring.name
						?.toLowerCase()
						?.trim()
						?.includes(filters.q.toString().toLowerCase().trim())
				: true
		);

	if (filters.isTile !== false) {
		// filter by start date
		return (
			filteredMonitorings
				.filter(monitoring =>
					filters.startDate
						? monitoring.scheduling.startDate &&
						  monitoring.scheduling.startDate.getTime() >= filters.startDate
						: true
				)
				// filter by end date
				.filter(monitoring =>
					filters.endDate
						? monitoring.scheduling.endDate &&
						  monitoring.scheduling.endDate.getTime() >= filters.endDate
						: true
				)
				// filter by frequency
				.filter(monitoring =>
					filters.frequency.length
						? filters.frequency.some(
								freq =>
									monitoring.scheduling.frequency.toLowerCase() === freq.toLowerCase()
						  )
						: true
				)
				// filter by number of run
				.filter(monitoring =>
					filters.numberOfRun?.length
						? filters.numberOfRun.some(numOfRun => numOfRun === monitoring.numberOfRun)
						: true
				)
				// filter by current run
				.filter(monitoring =>
					filters.currentRun?.length
						? filters.currentRun.some(currRun => currRun === monitoring.currentRun)
						: true
				)
				// filter by tab
				.filter(monitoring =>
					`${filters.tab}` === '1'
						? monitoring.status === 'pending'
						: `${filters.tab}` === '2'
						? monitoring.status === 'ongoing'
						: `${filters.tab}` === '3'
						? monitoring.status === 'completed'
						: monitoring
				)
		);
	}
	return filteredMonitorings;
};

const filteredStartedMonitorings = selector({
	key: 'filteredStartedMonitorings',
	get: ({ get }) => {
		const filters = get(dashboardFilters);
		const monitorings = get(startedMonitorings);
		return {
			monitorings: applyFilters(monitorings, filters),
			startDate: prepareDateFilter(monitorings, filters, 'startDate'),
			endDate: prepareDateFilter(monitorings, filters, 'endDate'),
			currentRun: [
				...new Set(
					monitorings
						.map(monitoring => monitoring.currentRun)
						.filter(o => !!o) as number[]
				)
			].map(currentRun => ({
				currentRun,
				enabled: filters.currentRun?.includes(currentRun)
			})),
			numberOfRun: [
				...new Set(
					monitorings
						.map(monitoring => monitoring.numberOfRun)
						.filter(o => !!o) as number[]
				)
			].map(numberOfRun => ({
				numberOfRun,
				enabled: filters.numberOfRun?.includes(numberOfRun)
			})),
			frequency: [
				...new Set(
					monitorings
						.map(monitoring => monitoring.scheduling.frequency)
						.filter(f => !!f) as string[]
				)
			].map(frequency => ({
				frequency,
				enabled: filters.frequency.includes(frequency ?? '')
			}))
		};
	}
});

export { dashboardFilters, startedMonitorings, filteredStartedMonitorings };
