import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	filteredStartedMonitorings,
	startedMonitorings,
	dashboardFilters
} from '@store/dashboard-monitoring/dashboardFilters';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import useGetAllMonitoring from '@api/change-monitoring-analyst/useGetAllMonitoring';

const useStartedMonitorings = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		frequency: string[];
		numberOfRun: number | undefined;
		minStartDate: string | undefined;
		maxStartDate: string | undefined;
		minEndDate: string | undefined;
		maxEndDate: string | undefined;
		currentRun: number | undefined;
		tab: number | undefined;
		q: string | undefined;
		isTile: boolean;
	}>({
		frequency: [],
		numberOfRun: undefined,
		minStartDate: undefined,
		maxStartDate: undefined,
		minEndDate: undefined,
		maxEndDate: undefined,
		currentRun: undefined,
		tab: undefined,
		isTile: true,
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(dashboardFilters);
	const setMonitorings = useSetRecoilState(startedMonitorings);
	const {
		monitorings,
		frequency,
		numberOfRun,
		minStartDate,
		maxStartDate,
		minEndDate,
		maxEndDate,
		currentRun
	} = useRecoilValue(filteredStartedMonitorings);
	const { data = new Map() } = useGetAllMonitoring();

	useEffect(() => {
		setMonitorings([...data.values()]);
	}, [data, setMonitorings]);

	useEffect(() => {
		setFilters({
			frequency: urlFilters.frequency ?? [],
			numberOfRun: urlFilters.numberOfRun,
			minStartDate: urlFilters.minStartDate,
			maxStartDate: urlFilters.maxStartDate,
			minEndDate: urlFilters.minEndDate,
			maxEndDate: urlFilters.maxEndDate,
			currentRun: urlFilters.currentRun,
			tab: urlFilters.tab,
			isTile: urlFilters.isTile,
			q: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		frequency,
		numberOfRun,
		minStartDate,
		maxStartDate,
		minEndDate,
		maxEndDate,
		currentRun
	};
	return { monitorings, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useStartedMonitorings;
