import useUrlState from '@hooks/useUrlState';
import {
	newRevalidationFilters,
	filteredRevalidations,
	revalidationsList
} from '@store/user-revalidation/newRevalidationFilters';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

const useRevalidations = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		layer: string[];
		type: string[];
		q: string | undefined;
	}>({
		layer: [],
		type: [],
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(newRevalidationFilters);
	const setRevalidations = useSetRecoilState(revalidationsList);
	const { revalidations, layer, type } = useRecoilValue(filteredRevalidations);

	useEffect(() => {
		const data = [
			{
				id: 'id1',
				name: 'Very Very Very Very Very long Name',
				type: 'SUID',
				layer: 'OS'
			},
			{
				id: 'id2',
				name: 'Campaign Name',
				type: 'User Access Review',
				layer: 'DB'
			}
		];
		setRevalidations([...data.values()]);
	}, [setRevalidations]);

	useEffect(() => {
		setFilters({
			type: urlFilters.type,
			layer: urlFilters.layer,
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		layer,
		type
	};
	return { revalidations, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useRevalidations;
