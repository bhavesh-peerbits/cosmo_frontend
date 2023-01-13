/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import { isAfter, isBefore } from 'date-fns';
import Monitoring from '@model/Monitoring';

type Filters = {
	frequency: string[];
	numberOfRun: number | undefined;
	minStartDate: string | undefined;
	maxStartDate: string | undefined;
	minEndDate: string | undefined;
	maxEndDate: string | undefined;
	currentRun: number | undefined;
	tab: number | undefined;
	q: string | undefined;
	isTile: boolean | undefined;
};

const dashboardFilters = atom<Filters>({
	key: 'monitoringDashboardFilters',
	default: {
		frequency: [],
		numberOfRun: undefined,
		minStartDate: undefined,
		maxStartDate: undefined,
		minEndDate: undefined,
		maxEndDate: undefined,
		currentRun: undefined,
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
									monitoring.scheduling.frequency.toLocaleLowerCase() ===
									freq.toLowerCase()
						  )
						: true
				)
				// filter by number of run
				.filter(monitoring =>
					filters.numberOfRun
						? filters.numberOfRun === monitoring.scheduling.totalRuns
						: true
				)
				// filter by current run
				.filter(monitoring =>
					filters.currentRun ? filters.currentRun === monitoring.currentRun : true
				)
				// filter by tab
				.filter(monitoring =>
					filters.tab === 1
						? monitoring.status === 'PENDING'
						: filters.tab === 2
						? monitoring.status === 'ONGOING'
						: filters.tab === 3
						? monitoring.status === 'COMPLETED'
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
						return element.scheduling.startDate.getTime();
					})
				)
			),
			minStartDate: new Date(
				Math.min(
					...monitorings.map(element => {
						return element.scheduling.startDate.getTime();
					})
				)
			),
			maxEndDate: new Date(
				Math.max(
					...monitorings.map(element => {
						return element.scheduling.endDate ? element.scheduling.endDate.getTime() : 0;
					})
				)
			),
			minEndDate: new Date(
				Math.min(
					...monitorings.map(element => {
						return element.scheduling.endDate ? element.scheduling.endDate.getTime() : 0;
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
				enabled: filters.currentRun === currentRun
			})),
			numberOfRun: [
				...new Set(
					monitorings
						.map(monitoring => monitoring.scheduling.totalRuns)
						.filter(o => !!o) as number[]
				)
			].map(numberOfRun => ({
				numberOfRun,
				enabled: filters.numberOfRun === numberOfRun
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
