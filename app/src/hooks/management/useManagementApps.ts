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
		lastReview: number | undefined;
		lastModify: number | undefined;
		owner: string[];
		q: string | undefined;
		isTile: boolean;
	}>({
		isTile: true,
		lastModify: undefined,
		lastReview: undefined,
		owner: [],
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(managementFilters);
	const setApps = useSetRecoilState(managementApps);
	const { apps, lastReview, lastModify, owner } = useRecoilValue(filteredApplications);
	const { data = [] } = useGetApps();

	useEffect(() => {
		setApps(data);
	}, [data, setApps]);

	useEffect(() => {
		setFilters({
			lastModify: urlFilters.lastModify,
			lastReview: urlFilters.lastReview,
			owner: urlFilters.owner ?? [],
			query: urlFilters.q,
			isTile: urlFilters.isTile
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		lastModify,
		lastReview,
		owner
	};
	return { apps, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useManagementApps;
