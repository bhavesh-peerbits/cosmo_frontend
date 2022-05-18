import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	filteredApplications,
	reviewApps,
	reviewFilters
} from '@store/review/reviewFilters';
import { useEffect } from 'react';
import useGetApps from '@api/review/useGetAppsReview';
import useUrlState from '@hooks/useUrlState';

const useReviewApps = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		q: string | undefined;
		analyst: string[];
		startDate: undefined | string;
		dueDate: number | undefined;
	}>({
		q: undefined,
		analyst: [],
		startDate: undefined,
		dueDate: undefined
	});
	const [filters, setFilters] = useRecoilState(reviewFilters);
	const setApps = useSetRecoilState(reviewApps);
	const { apps, analyst, startDate, dueDate } = useRecoilValue(filteredApplications);
	const { data = [] } = useGetApps();

	useEffect(() => {
		setApps(data);
	}, [data, setApps]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q,
			analyst: urlFilters.analyst ?? [],
			startDate: urlFilters.startDate,
			dueDate: urlFilters.dueDate
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		analyst,
		startDate,
		dueDate
	};

	return { apps, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useReviewApps;
