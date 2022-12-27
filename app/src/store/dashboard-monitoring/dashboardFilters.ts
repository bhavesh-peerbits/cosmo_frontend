/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import Monitoring from '@model/Monitoring';
import { isAfter, isBefore } from 'date-fns';

type Filters = {
	frequency: string[];
	numberOfRun: number[] | undefined;
	minStartDate: string | undefined;
	maxStartDate: string | undefined;
	minEndDate: string | undefined;
	maxEndDate: string | undefined;
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
		minStartDate: undefined,
		maxStartDate: undefined,
		minEndDate: undefined,
		maxEndDate: undefined,
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
		return (
			filteredMonitorings
				// filter by start date
				.filter(request =>
					filters.minStartDate
						? request.scheduling.startDate &&
						  isAfter(request.scheduling.startDate, new Date(filters.minStartDate))
						: true
				)
				.filter(request =>
					filters.maxStartDate
						? request.scheduling.startDate &&
						  isBefore(request.scheduling.startDate, new Date(filters.maxStartDate))
						: true
				)

				// filter by end date
				.filter(request =>
					filters.minEndDate
						? request.scheduling.endDate &&
						  isAfter(request.scheduling.endDate, new Date(filters.minEndDate))
						: true
				)
				.filter(request =>
					filters.maxStartDate
						? request.scheduling.startDate &&
						  isBefore(request.scheduling.startDate, new Date(filters.maxStartDate))
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
					filters.tab === 1
						? monitoring.status === 'pending'
						: filters.tab === 2
						? monitoring.status === 'ongoing'
						: filters.tab === 3
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
			maxStartDate: new Date(
				Math.max(
					...monitorings.map(element => {
						return new Date(element.scheduling.startDate).getTime();
					})
				)
			),
			minStartDate: new Date(
				Math.min(
					...monitorings.map(element => {
						return new Date(element.scheduling.startDate).getTime();
					})
				)
			),
			maxEndDate: new Date(
				Math.max(
					...monitorings.map(element => {
						return new Date(element.scheduling.endDate).getTime();
					})
				)
			),
			minEndDate: new Date(
				Math.min(
					...monitorings.map(element => {
						return new Date(element.scheduling.endDate).getTime();
					})
				)
			),
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
