import { useQuery } from 'react-query';
import ApplicationReview from '@model/ApplicationReview';

const getReviews = () => {
	const fakeData: ApplicationReview[] = [
		{
			id: '1',
			procedure: 'procedure1',
			status: 'Ongoing',
			appName: 'app1',
			expireDate: new Date(),
			owner: {
				id: '1',
				name: 'owner1',
				displayName: 'owner1',
				username: 'owner1',
				principalRole: 'Admin',
				roles: [],
				email: 'test@mail.com',
				surname: 'surname1'
			}
		},
		{
			id: '2',
			procedure: 'procedure2',
			status: 'Ongoing',
			appName: 'app1',
			expireDate: new Date(),
			owner: {
				id: '1',
				name: 'owner1',
				displayName: 'owner1',
				username: 'owner1',
				principalRole: 'Admin',
				roles: [],
				email: 'test@mail.com',
				surname: 'surname1'
			}
		}
	];
	return fakeData;
};

export default () => useQuery(['reviews'], getReviews);
