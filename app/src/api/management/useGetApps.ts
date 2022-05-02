import { useQuery } from 'react-query';

const useGetApps = () => {
	// return api.applicationApi
	// 	.getAllApplications()
	// 	.then(({ data }) => (data ? data.map(fromApplicationApi) : []));
	return [
		{
			id: '1',
			name: 'App 1',
			description: 'App 1 description',
			lastModify: new Date('2020-02-05T00:00:00.000Z'),
			lastReview: new Date('2020-02-05T00:00:00.000Z'),
			code: 'Code', // TODO
			owner: 'Owner', // TODO
			icon: 'mobile' as const // TODO
		},
		{
			id: '2',
			name: 'App 2',
			description:
				'App 2 description Very long, ellipses text try to appear ellipses text try to appear ellipses text try to appear as asd asssss asdasd appear appear appear appear appear as',
			lastModify: new Date('2020-01-22T00:00:00.000Z'),
			lastReview: new Date('2020-02-22T00:00:00.000Z'),
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'web' as const // TODO
		},
		{
			id: '4',
			name: 'App 3',
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'web' as const, // TODO
			lastModify: new Date('2022-01-01T00:00:00.000Z')
		},
		{
			id: '5',
			name: 'App 3',
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'web' as const, // TODO
			lastReview: new Date('2022-01-11T00:00:00.000Z'),
			lastModify: new Date('2022-01-01T00:00:00.000Z')
		},
		{
			id: '6',
			name: 'App 3',
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'web' as const, // TODO
			lastModify: new Date('2022-01-01T00:00:00.000Z')
		},
		{
			id: '7',
			name: 'App 3',
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'web' as const, // TODO
			lastModify: new Date('2022-01-01T00:00:00.000Z')
		},
		{
			id: '8',
			name: 'App 3',
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'web' as const, // TODO
			lastModify: new Date('2022-01-01T00:00:00.000Z')
		}
	];
};

export default () => useQuery(['managementApps'], useGetApps);
