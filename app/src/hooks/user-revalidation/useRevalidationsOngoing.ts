import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import {
	revalidationsOngoingFilters,
	revalidationsOngoing,
	filteredRevalidationsOngoing
} from '@store/user-revalidation/revalidationsOngoingFilters';
import {
	CampaignDtoLayerEnum,
	CampaignDtoStatusEnum,
	CampaignDtoTypeEnum
} from 'cosmo-api/src/v1';

const useRevalidationsOngoing = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		dueDate: number | undefined;
		layer: string[];
		revalidationType: string[];
		status: string[];
		q: string | undefined;
	}>({
		dueDate: undefined,
		layer: [],
		revalidationType: [],
		status: [],
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(revalidationsOngoingFilters);
	const setRevalidations = useSetRecoilState(revalidationsOngoing);
	const { revalidations, dueDate, layer, revalidationType, status } = useRecoilValue(
		filteredRevalidationsOngoing
	);
	// TODO fix

	useEffect(() => {
		const data = [
			{
				id: 'id1',
				name: 'Very Very Very Very Very long Name',
				type: 'USER_ACCESS_REVIEW' as CampaignDtoTypeEnum,
				layer: 'OS' as CampaignDtoLayerEnum,
				dueDate: new Date(),
				startDate: new Date(),
				status: 'REVIEW_IN_PROGRESS' as CampaignDtoStatusEnum,
				applicationsCount: 5,
				archived: false,
				contributors: []
			},
			{
				id: 'id2',
				name: 'Campaign Name',
				type: 'SUID' as CampaignDtoTypeEnum,
				layer: 'DB' as CampaignDtoLayerEnum,
				dueDate: new Date(),
				startDate: new Date(),
				status: 'ANNULLED' as CampaignDtoStatusEnum,
				applicationsCount: 5,
				archived: false,
				contributors: []
			},
			{
				id: 'id3',
				name: 'Campaign Name3',
				type: 'FIREFIGHT' as CampaignDtoTypeEnum,
				layer: 'OS' as CampaignDtoLayerEnum,
				dueDate: new Date(),
				startDate: new Date(),
				status: 'COMPLETED' as CampaignDtoStatusEnum,
				applicationsCount: 5,
				archived: false,
				contributors: []
			},
			{
				id: 'id4',
				name: 'Campaign Name1',
				type: 'FIREFIGHT' as CampaignDtoTypeEnum,
				layer: 'SW' as CampaignDtoLayerEnum,
				dueDate: new Date(),
				startDate: new Date(),
				status: 'COMPLETED_WITH_PARTIAL_ANSWERS' as CampaignDtoStatusEnum,
				applicationsCount: 5,
				archived: false,
				contributors: []
			}
		];
		setRevalidations(data);
	}, [setRevalidations]); // TODO Use real campaigns

	useEffect(() => {
		setFilters({
			dueDate: urlFilters.dueDate,
			layer: urlFilters.layer ?? [],
			revalidationType: urlFilters.revalidationType ?? [],
			status: urlFilters.status ?? [],
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		dueDate,
		layer,
		revalidationType,
		status
	};
	return { revalidations, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useRevalidationsOngoing;
