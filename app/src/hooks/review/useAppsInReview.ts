import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	filteredApplications,
	reviewApps,
	reviewFilters
} from '@store/review/reviewFilters';
import { useEffect } from 'react';
import useGetAppsInReview from '@api/review/useGetAppsInReview';
import useUrlState from '@hooks/useUrlState';

const useAppsInReview = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		q: string | undefined;
		owner: string[];
		dueDate: number | undefined;
		startNarrativeReview: string | undefined;
	}>({
		q: undefined,
		owner: [],
		dueDate: undefined,
		startNarrativeReview: undefined
	});
	const [filters, setFilters] = useRecoilState(reviewFilters);
	const setApps = useSetRecoilState(reviewApps);
	const { apps, owner, dueDate, startNarrativeReview } =
		useRecoilValue(filteredApplications);
	const { data = new Map() } = useGetAppsInReview();

	useEffect(() => {
		setApps([...data.values()]);
	}, [data, setApps]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q,
			owner: urlFilters.owner ?? [],
			dueDate: urlFilters.dueDate,
			startNarrativeReview: urlFilters.startNarrativeReview
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		owner,
		dueDate,
		startNarrativeReview
	};

	return { apps, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useAppsInReview;
