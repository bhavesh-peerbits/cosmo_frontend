import api from '@api';
import { useQuery } from 'react-query';
import { fromApplicationApi } from '@model/Application';

const useGetApp = (appId: string) => {
	return fromApplicationApi({
		icon: '',
		codeName: 'code',
		owner: {
			id: '376baaf1-28d5-4d0e-961c-9ef016bdf811',
			username: 'ownerusername',
			name: 'UserOwner'
		},
		id: 1,
		name: 'App 1',
		description: 'App 1 description',
		lastModify: '2020-02-05T00:00:00.000Z',
		lastReview: '2020-02-05T00:00:00.000Z',
		applicationData: {
			appServer: 'http://localhost:8080',
			appServerOS: 'Linux'
		}
	});
	return api.applicationApi
		.getApplicationById({ id: +appId })
		.then(({ data }) => fromApplicationApi(data));
};

export default (appId: string) =>
	useQuery(['managementApps', appId], () => useGetApp(appId));
