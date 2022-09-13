import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import {
	revalidationsOngoingFilters,
	revalidationsOngoing,
	filteredRevalidationsOngoing
} from '@store/user-revalidation/revalidationsOngoingFilters';
import CampaignWithReview from '@model/CampaignWithReview';
import useGetCampaignsOngoingAndCompleted from '@api/user-revalidation/useGetCampaignsOngoingAndCompleted';

const useRevalidationsOngoing = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		dueDate: number | undefined;
		layer: string[];
		revalidationType: string[];
		q: string | undefined;
	}>({
		dueDate: undefined,
		layer: [],
		revalidationType: [],
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(revalidationsOngoingFilters);
	const setRevalidations = useSetRecoilState(revalidationsOngoing);
	const { revalidations, dueDate, layer, revalidationType } = useRecoilValue(
		filteredRevalidationsOngoing
	);
	const { data: campaigns = new Map<string, CampaignWithReview>() } =
		useGetCampaignsOngoingAndCompleted();

	useEffect(() => {
		setRevalidations([...campaigns.values()]);
	}, [campaigns, setRevalidations]);

	useEffect(() => {
		setFilters({
			dueDate: urlFilters.dueDate,
			layer: urlFilters.layer ?? [],
			revalidationType: urlFilters.revalidationType ?? [],
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		dueDate,
		layer,
		revalidationType
	};
	return { revalidations, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useRevalidationsOngoing;
