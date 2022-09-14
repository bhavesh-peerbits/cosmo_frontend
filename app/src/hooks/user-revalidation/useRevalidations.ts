import useUrlState from '@hooks/useUrlState';
import {
	newRevalidationFilters,
	filteredRevalidations,
	revalidationsList
} from '@store/user-revalidation/newRevalidationFilters';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import useGetNotStartedCampaigns from '@api/user-revalidation/useGetNotStartedCampaigns';

const useRevalidations = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		application: 'multi' | 'single' | undefined;
		layer: string[];
		type: string[];
		q: string | undefined;
	}>({
		application: undefined,
		layer: [],
		type: [],
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(newRevalidationFilters);
	const setRevalidations = useSetRecoilState(revalidationsList);
	const { revalidations, layer, type, application } =
		useRecoilValue(filteredRevalidations);
	const { data = new Map() } = useGetNotStartedCampaigns();

	useEffect(() => {
		setRevalidations([...data.values()]);
	}, [data, setRevalidations]);

	useEffect(() => {
		setFilters({
			type: urlFilters.type,
			layer: urlFilters.layer,
			query: urlFilters.q,
			application: urlFilters.application
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		layer,
		type,
		application
	};
	return { revalidations, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useRevalidations;
