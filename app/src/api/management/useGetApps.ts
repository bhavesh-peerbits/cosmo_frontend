import api from '@api';
import { useQuery } from 'react-query';
import { fromApplicationApi } from '@model/Application';
import { UserRoleEnum } from '@model/UserRole';

const useGetApps = () => {
	return [
		{
			id: '1',
			name: 'App 1',
			codeName: 'Code', // TODO
			description: 'App 1 description',
			lastModify: new Date('2020-02-05T00:00:00.000Z'),
			lastReview: new Date('2020-02-05T00:00:00.000Z'),
			applicationData: {},
			delegates: [],
			owner: {
				name: 'Owner2',
				id: 'ewrwer',
				username: 'username',
				surname: 'surname',
				displayName: 'displayName',
				roles: [UserRoleEnum.UserAdmin],
				principalRole: 'Admin' as const,
				email: 'email'
			}, // TODO
			icon: 'mobile' as const // TODO
		},
		{
			id: '6',
			name: 'App 3',
			codeName: 'Code', // TODO
			owner: {
				name: 'Owner2',
				id: 'ewrwer',
				username: 'username',
				surname: 'surname',
				displayName: 'displayName',
				roles: [UserRoleEnum.UserAdmin],
				principalRole: 'Admin' as const,
				email: 'email'
			}, // TODO
			applicationData: {},
			delegates: [],
			icon: 'web' as const, // TODO
			lastModify: new Date('2022-01-01T00:00:00.000Z')
		},
		{
			id: '7',
			name: 'App 3',
			codeName: 'Code', // TODO
			owner: {
				name: 'Owner2',
				id: 'ewrwer',
				username: 'username',
				surname: 'surname',
				displayName: 'displayName',
				roles: [UserRoleEnum.UserAdmin],
				principalRole: 'Admin' as const,
				email: 'email'
			}, // TODO
			applicationData: {},
			delegates: [],
			icon: 'web' as const, // TODO
			lastModify: new Date('2022-01-01T00:00:00.000Z')
		},
		{
			id: '8',
			name: 'App 3',
			codeName: 'Code', // TODO
			applicationData: {},
			delegates: [],
			code: 'Code', // TODO
			owner: {
				name: 'Owner2',
				id: 'ewrwer',
				username: 'username',
				displayName: 'displayName',
				roles: [UserRoleEnum.UserAdmin],
				principalRole: 'Admin' as const,
				surname: 'surname',
				email: 'email'
			}, // TODO
			icon: 'web' as const, // TODO
			lastModify: new Date('2022-01-01T00:00:00.000Z')
		}
	];
	api.applicationApi
		.getAllApplications()
		.then(({ data }) => (data ? data.map(fromApplicationApi) : []));
};

export default () => useQuery(['managementApps'], useGetApps);
