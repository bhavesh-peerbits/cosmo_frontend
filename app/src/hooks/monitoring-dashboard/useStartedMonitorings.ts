import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	filteredStartedMonitorings,
	startedMonitorings,
	dashboardFilters
} from '@store/dashboard-monitoring/dashboardFilters';
import { useEffect, useMemo } from 'react';
import useUrlState from '@hooks/useUrlState';

const useStartedMonitorings = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		frequency: string[];
		numberOfRun: number[] | undefined;
		startDate: number | undefined;
		endDate: number | undefined;
		currentRun: number[] | undefined;
		tab: number | undefined;
		q: string | undefined;
		isTile: boolean;
	}>({
		frequency: [],
		numberOfRun: [],
		startDate: undefined,
		endDate: undefined,
		currentRun: [],
		tab: undefined,
		isTile: true,
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(dashboardFilters);
	const setMonitorings = useSetRecoilState(startedMonitorings);
	const { monitorings, frequency, numberOfRun, startDate, endDate, currentRun } =
		useRecoilValue(filteredStartedMonitorings);
	const data = useMemo(
		() => [
			{
				id: '1',
				type: true,
				name: 'Nome',
				status: 'pending',
				framework: 'Framework',
				control: ['control1', 'control2'],
				scheduling: {
					startDate: new Date(),
					endDate: new Date(),
					frequency: 'On demand'
				},
				numberOfRun: 2,
				startDate: new Date(),
				endDate: new Date(),
				currentRun: 1
			},
			{
				id: '2',
				type: true,
				name: 'Nome',
				status: 'ongoing',
				framework: 'Framework',
				control: ['control3', 'control4'],
				scheduling: {
					startDate: new Date(),
					endDate: new Date(),
					frequency: 'Annual'
				},
				numberOfRun: 8,

				currentRun: 3
			},
			{
				id: '3',
				type: true,
				name: 'Nome',
				status: 'completed',
				framework: 'Framework',
				control: ['control13', 'control42'],
				scheduling: {
					startDate: new Date(),
					endDate: new Date(),
					frequency: 'Annual'
				},
				numberOfRun: 18,
				startDate: new Date(),
				endDate: new Date(),
				currentRun: 13
			}
		],
		[]
	);

	useEffect(() => {
		setMonitorings(data);
	}, [data, setMonitorings]);

	useEffect(() => {
		setFilters({
			frequency: urlFilters.frequency ?? [],
			numberOfRun: urlFilters.numberOfRun,
			startDate: urlFilters.startDate,
			endDate: urlFilters.endDate,
			currentRun: urlFilters.currentRun,
			tab: urlFilters.tab,
			isTile: urlFilters.isTile,
			q: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		frequency,
		numberOfRun,
		startDate,
		endDate,
		currentRun
	};
	return { monitorings, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useStartedMonitorings;
