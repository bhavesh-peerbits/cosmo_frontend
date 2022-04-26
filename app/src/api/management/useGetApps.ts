import { useQuery } from 'react-query';

const useGetApps = () => {
	// return api.applicationApi
	// 	.getAllApplications()
	// 	.then(({ data }) => (data ? data.map(fromApplicationApi) : []));
	return [
		{
			id: '1',
			name: 'App 1',
			category: 'Category', // TODO
			code: 'Code', // TODO
			owner: 'Owner', // TODO
			icon: 'icon' // TODO
		},
		{
			id: '2',
			name: 'App 2',
			category: 'Category', // TODO
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'icon' // TODO
		},
		{
			id: '3',
			name: 'App 3',
			category: 'Category 2', // TODO
			code: 'Code', // TODO
			owner: 'Owner2', // TODO
			icon: 'icon' // TODO
		}
	];
};

export default () => useQuery(['managementApps'], useGetApps);
