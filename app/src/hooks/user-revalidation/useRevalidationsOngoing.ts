import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';
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
import useGetApps from '@api/management/useGetApps';
import CampaignReview from '@model/CampaignReview';

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

	// TODO remove and replace with data from endpoints
	const { data = new Map() } = useGetApps();
	const apps = useMemo(() => [...data.values()] || [], [data]);
	const fakeCampaignsData = useMemo(
		() => [
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
		],
		[]
	);
	// TODO replace with real data
	// TODO Dovresti usare getAllCampaignsWithReviews
	const fakeData: CampaignReview[] = useMemo(
		() => [
			{
				campaign: fakeCampaignsData[0],
				reviews: [
					{
						id: 'idCampaignApp1',
						campaign: fakeCampaignsData[0],
						application: apps[0],
						status: 'WIP'
					},
					{
						id: 'idCampaignApp2',
						campaign: fakeCampaignsData[0],
						application: apps[1],
						status: 'WIP'
					}
				]
			},
			{
				campaign: fakeCampaignsData[1],
				reviews: [
					{
						id: 'idCampaignApp3',
						campaign: fakeCampaignsData[0],
						application: apps[2],
						status: 'WIP'
					},
					{
						id: 'idCampaignApp4',
						campaign: fakeCampaignsData[0],
						application: apps[3],
						status: 'WIP'
					}
				]
			}
		],
		[apps, fakeCampaignsData]
	);
	useEffect(() => {
		setRevalidations(fakeData);
	}, [apps, fakeCampaignsData, fakeData, revalidations, setRevalidations]); // TODO Use real campaigns

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
