import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import useGetAllMonitoring from '@api/change-monitoring/useGetAllMonitoring';
import {
	newDraftFilters,
	newDraftMonitorings,
	filteredNewDraftMonitorings
} from '@store/new-monitoring/newDraftFilters';

const useMonitoringForNewDraft = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		application: string[];
		controlCode: string[];
		q: string | undefined;
	}>({
		application: [],
		controlCode: [],
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(newDraftFilters);
	const setMonitorings = useSetRecoilState(newDraftMonitorings);
	const { application, controlCode, monitorings } = useRecoilValue(
		filteredNewDraftMonitorings
	);
	const { data = new Map() } = useGetAllMonitoring();

	useEffect(() => {
		setMonitorings([...data.values()]);
	}, [data, setMonitorings]);

	useEffect(() => {
		setFilters({
			application: urlFilters.application ?? [],
			controlCode: urlFilters.controlCode ?? [],
			q: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		application,
		controlCode
	};
	return { monitorings, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useMonitoringForNewDraft;
