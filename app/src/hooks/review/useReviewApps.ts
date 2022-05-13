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
	}>({
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(reviewFilters);
	const setApps = useSetRecoilState(reviewApps);
	const { apps } = useRecoilValue(filteredApplications);
	const { data = [] } = useGetApps();

	useEffect(() => {
		setApps(data);
	}, [data, setApps]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	return { apps, filters, setFilters: setUrlFilters };
};

export default useReviewApps;
