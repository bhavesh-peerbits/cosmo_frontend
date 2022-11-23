import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import {
	appsList,
	appsVisibilityFilters,
	filteredApplications
} from '@store/admin-panel/appsVisibilityFilters';
import useGetAppsAdmin from '@api/user-admin/useGetAppsAdmin';

const useVisibilityApps = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		q: string | undefined;
		tab?: number;
	}>({
		q: undefined,
		tab: undefined
	});
	const [filters, setFilters] = useRecoilState(appsVisibilityFilters);
	const setApps = useSetRecoilState(appsList);
	const { apps } = useRecoilValue(filteredApplications);
	const { data = new Map() } = useGetAppsAdmin();

	useEffect(() => {
		setApps([...data.values()]);
	}, [data, setApps]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	return { apps, filters, setFilters: setUrlFilters };
};

export default useVisibilityApps;
