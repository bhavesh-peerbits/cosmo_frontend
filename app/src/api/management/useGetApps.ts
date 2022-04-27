import { useQuery } from 'react-query';

const useGetApps = () => {
	// return api.applicationApi
	// 	.getAllApplications()
	// 	.then(({ data }) => (data ? data.map(fromApplicationApi) : []));
	return [
		{
			id: '1',
			name: 'App 1',
			lastModify: new Date('2020-01-01T00:00:00.000Z'),
			lastReview: new Date('2020-01-01T00:00:00.000Z'),
			code: 'Code', // TODO
			owner: 'Owner', // TODO
			icon: 'mobile' as const // TODO
		},
		{
			id: '2',
			name: 'App 2',
			lastModify: new Date('2020-01-01T00:00:00.000Z'),
			lastReview: new Date('2020-01-01T00:00:00.000Z'),
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'web' as const // TODO
		},
		{
			id: '3',
			name: 'App 3',
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'web' as const // TODO
		}
	];
};

export default () => useQuery(['managementApps'], useGetApps);
