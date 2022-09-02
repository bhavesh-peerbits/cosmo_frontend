import useUrlState from '@hooks/useUrlState';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
	filteredRevalidationsReview,
	newRevalidationReviewFilters,
	revalidationsReviewList
} from '@store/user-revalidation-review/newRevalidationReviewFilters';
import useGetReviewerCampaigns from '@api/review-campaign/useGetReviewerCampaigns';

const useRevalidationReview = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		dueDate: number | undefined;
		type: string[];
		status: string[];
		q: string | undefined;
	}>({
		dueDate: undefined,
		type: [],
		status: [],
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(newRevalidationReviewFilters);
	const setRevalidations = useSetRecoilState(revalidationsReviewList);
	const { revalidations, status, type, dueDate } = useRecoilValue(
		filteredRevalidationsReview
	);
	const { data = [] } = useGetReviewerCampaigns();

	useEffect(() => {
		setRevalidations(data);
	}, [data, setRevalidations]);

	useEffect(() => {
		setFilters({
			type: urlFilters.type,
			status: urlFilters.status,
			query: urlFilters.q,
			dueDate: urlFilters.dueDate
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		status,
		type,
		dueDate
	};
	return { revalidations, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useRevalidationReview;
