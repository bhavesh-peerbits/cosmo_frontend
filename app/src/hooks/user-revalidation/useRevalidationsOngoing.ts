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
		revalidationStatus: string[];
		q: string | undefined;
	}>({
		dueDate: undefined,
		layer: [],
		revalidationType: [],
		revalidationStatus: [],
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(revalidationsOngoingFilters);
	const setRevalidations = useSetRecoilState(revalidationsOngoing);
	const { revalidations, dueDate, layer, revalidationType, revalidationStatus } =
		useRecoilValue(filteredRevalidationsOngoing);
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
			revalidationStatus: urlFilters.revalidationStatus ?? [],
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		dueDate,
		layer,
		revalidationType,
		revalidationStatus
	};
	return { revalidations, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useRevalidationsOngoing;
