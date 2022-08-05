import useUrlState from '@hooks/useUrlState';
import {
	newRevalidationFilters,
	filteredRevalidations,
	revalidationsList
} from '@store/user-revalidation/newRevalidationFilters';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import useGetUserRevalidations from '@api/user-revalidation/useGetUserRevalidations';
import Campaign from '@model/Campaign';

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
	const { data = new Map() } = useGetUserRevalidations();

	useEffect(() => {
		// TODO remove
		const local = (
			[
				{
					id: 'id1',
					name: 'Very Very Very Very Very long Name',
					type: 'SUID',
					layer: 'OS',
					applicationsCount: 1
				},
				{
					id: 'id2',
					name: 'Campaign Name',
					type: 'User Access Review',
					layer: 'DB',
					applicationsCount: 0
				},
				{
					id: 'id3',
					name: 'Very Very Very Very Very long Name',
					type: 'User Access Review',
					layer: 'OS',
					applicationsCount: 4
				},
				{
					id: 'id4',
					name: 'Campaign Name',
					type: 'Firefight',
					layer: 'Software',
					applicationsCount: 12
				}
			] as Campaign[]
		).concat([...data.values()]);
		setRevalidations([...local.values()]);
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
