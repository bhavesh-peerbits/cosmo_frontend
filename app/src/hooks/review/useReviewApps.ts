import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	filteredApplications,
	reviewApps,
	reviewFilters
} from '@store/review/reviewFilters';
import { useEffect } from 'react';
import useGetApps from '@api/review/useGetReviews';
import useUrlState from '@hooks/useUrlState';

const useReviewApps = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		q: string | undefined;
		analyst: string[];
	}>({
		q: undefined,
		analyst: []
	});
	const [filters, setFilters] = useRecoilState(reviewFilters);
	const setApps = useSetRecoilState(reviewApps);
	const { apps, analyst } = useRecoilValue(filteredApplications);
	const { data = [] } = useGetApps();

	useEffect(() => {
		setApps(data);
	}, [data, setApps]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q,
			analyst: urlFilters.analyst ?? []
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		analyst
	};

	return { apps, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useReviewApps;
