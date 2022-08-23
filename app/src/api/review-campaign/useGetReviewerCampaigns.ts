import { useQuery } from 'react-query';

const getAllCampaigns = () => {
	// return api.revalidationApi
	// 	.getAllCampaigns()
	// 	.then(({ data }) => (data ? data.map(fromCampaignApi) : []))
	// 	.then(toMap); // TODO Fix
	return [
		{
			id: 'id1',
			name: 'Campagna di prova 1',
			applicationsCount: 3,
			dueDate: new Date(),
			type: 'SUID',
			status: 'REVIEW_IN_PROGRESS',
			archived: true,
			contributors: [],
			layer: 'OS'
		},
		{
			id: 'id2',
			name: 'Campagna di prova 2',
			applicationsCount: 3,
			dueDate: new Date(),
			type: 'SUID',
			status: 'REVIEW_IN_PROGRESS',
			archived: true,
			contributors: [],
			layer: 'OS'
		}
	];
};

export default () => useQuery(['reviewer-campaigns'], getAllCampaigns);
