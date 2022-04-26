import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	filteredApplications,
	managementApps,
	managementFilters
} from '@store/management/managementFilters';
import { useEffect } from 'react';
import useGetApps from '@api/management/useGetApps';
import useUrlState from '@hooks/useUrlState';

const useManagementApps = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		categories: string[];
		q: string | undefined;
		isTile: boolean;
	}>({
		isTile: true,
		categories: [],
		q: ''
	});
	const [filters, setFilters] = useRecoilState(managementFilters);
	const setApps = useSetRecoilState(managementApps);
	const { apps, categories } = useRecoilValue(filteredApplications);
	const { data = [] } = useGetApps();

	useEffect(() => {
		setApps(data);
	}, [data, setApps]);

	useEffect(() => {
		setFilters({
			categories: urlFilters.categories ?? [],
			query: urlFilters.q,
			isTile: urlFilters.isTile
		});
	}, [urlFilters, setFilters]);

	return { apps, categories, filters, setFilters: setUrlFilters };
};

export default useManagementApps;
