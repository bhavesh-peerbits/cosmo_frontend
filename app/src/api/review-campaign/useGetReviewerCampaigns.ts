import { useQuery } from 'react-query';
import ApplicationWithCampaigns from '@model/ApplicationWithCampaigns';

const getAllReviewCampaigns = () => {
	// return api.revalidationApi.getAllApplicationsWithCampaign().then(({ data }) =>
	// 	data.map(a => ({
	// 		app: fromApplicationApi(a.application as ApplicationApi),
	// 		campaigns: (a.campaigns || []).map(fromCampaignApi)
	// 	}))
	// );
	return [
		// TODO: remove this
		{
			id: '1',
			application: {
				id: '1',
				name: 'Test Application',
				owner: {
					id: '1',
					name: 'Test Owner',
					username: 'testOwner',
					surname: 'Test Surname',
					displayName: 'Test Owner',
					email: 'test@test.com',
					roles: ['REVIEWER', 'NARRATIVE_ADMIN'],
					inactive: false
				},
				codeName: 'testCodeName',
				delegates: [],
				icon: 'web',
				applicationData: { test: 'test' }
			},
			campaigns: [
				{
					id: '7',
					name: 'Campagna di prova 1',
					applicationsCount: 3,
					dueDate: new Date(),
					type: 'FIREFLIGHT' as const,
					status: 'REVIEW_IN_PROGRESS',
					archived: true,
					contributors: [],
					layer: 'OS'
				},
				{
					id: '2',
					name: 'Campagna di prova 2',
					applicationsCount: 3,
					dueDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
					type: 'SUID' as const,
					status: 'ANNULLED',
					archived: true,
					contributors: [],
					layer: 'OS'
				}
			]
		} as ApplicationWithCampaigns,
		{
			id: '2',
			application: {
				id: '2',
				name: 'Test Application 2',
				owner: {
					id: '1',
					name: 'Test Owner',
					username: 'testOwner',
					surname: 'Test Surname',
					displayName: 'Test Owner',
					email: 'test@test.com',
					roles: ['REVIEWER', 'NARRATIVE_ADMIN'],
					inactive: false
				},
				codeName: 'testCodeName',
				delegates: [],
				icon: 'web',
				applicationData: { test: 'test' }
			},
			campaigns: [
				{
					id: '4',
					name: 'Campagna di prova 1',
					applicationsCount: 3,
					dueDate: new Date(),
					type: 'FIREFLIGHT',
					status: 'COMPLETED',
					archived: true,
					contributors: [],
					layer: 'OS'
				},
				{
					id: '5',
					name: 'Campagna di prova 2',
					applicationsCount: 3,
					dueDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
					type: 'SUID' as const,
					status: 'ANNULLED',
					archived: true,
					contributors: [],
					layer: 'OS'
				}
			]
		} as ApplicationWithCampaigns
	];
};

export default () => useQuery(['campaigns-reviewer'], getAllReviewCampaigns);
