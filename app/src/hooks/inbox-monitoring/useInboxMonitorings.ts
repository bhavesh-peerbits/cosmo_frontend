import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	filteredInboxMonitorings,
	inboxMonitorings,
	inboxMonitoringFilters
} from '@store/inbox-monitoring/inboxMonitoringFilters';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import useGetAllMonitoringFocalPoint from '@api/change-monitoring/useGetAllMonitoringFocalPoint';

const useInboxMonitorings = () => {
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
	const [filters, setFilters] = useRecoilState(inboxMonitoringFilters);
	const setMonitorings = useSetRecoilState(inboxMonitorings);
	const {
		monitorings,
		frequency,
		numberOfRun,
		minStartDate,
		maxStartDate,
		minEndDate,
		maxEndDate,
		currentRun
	} = useRecoilValue(filteredInboxMonitorings);
	const { data = new Map() } = useGetAllMonitoringFocalPoint();

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

export default useInboxMonitorings;
