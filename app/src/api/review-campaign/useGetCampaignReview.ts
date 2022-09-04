import { useQuery } from 'react-query';
import api from '@api';
import { CampaignWithReviewApi } from 'cosmo-api/src';
import { fromCampaignWithReviewApi } from '@model/CampaignWithReview';

export function getCampaign(campaignId: string) {
	return api.revalidationApi
		.getCampaignWithReviewById({
			campaignId: +campaignId
		})
		.catch(() => ({
			// TODO: remove this
			data: {
				campaignDto: {
					id: 1,
					type: 'FIREFIGHT' as const,
					layer: 'OS' as const
				},
				reviewDtos: [
					{
						id: 1,
						status: 'WIP' as const,
						campaign: {
							id: 1,
							type: 'FIREFIGHT' as const,
							layer: 'OS' as const
						},
						application: {
							id: 1,
							name: 'Test Application',
							owner: {
								id: '1',
								name: 'Test Owner',
								username: 'testOwner',
								surname: 'Test Surname',
								email: 'asd@test.com',
								roles: ['REVIEWER', 'NARRATIVE_ADMIN'],
								inactive: false
							},
							codeName: 'testCodeName',
							delegates: [],
							icon: 'web'
						}
					},
					{
						id: 2,
						status: 'WIP' as const,
						campaign: {
							id: 1,
							type: 'FIREFIGHT' as const,
							layer: 'OS' as const,
							dueDate: new Date()
						},
						application: {
							id: 2,
							name: 'Test Application',
							owner: {
								id: '1',
								name: 'Test Owner',
								username: 'testOwner',
								surname: 'Test Surname',
								email: 'asd@test.com',
								roles: ['REVIEWER', 'NARRATIVE_ADMIN'],
								inactive: false
							},
							codeName: 'testCodeName',
							delegates: [],
							icon: 'web'
						}
					}
				]
			} as CampaignWithReviewApi
		}))
		.then(({ data }) => fromCampaignWithReviewApi(data));
}

export default (campaignId: string) =>
	useQuery(['campaigns-reviewer', campaignId], () => getCampaign(campaignId));
