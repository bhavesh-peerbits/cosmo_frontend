import { icons } from '@components/IconPicker';
import { UserDisplayRole } from '@model/UserRole';
import { useQuery } from 'react-query';

const admin: UserDisplayRole = 'Admin';
const webIcon: keyof typeof icons = 'web';
const useGetAppsReview = () => {
	return [
		{
			id: 'id1',
			name: 'App Name 1',
			codeName: 'Code Name',
			description: '',
			lastReview: new Date(),
			lastModify: new Date(),
			owner: {
				id: '1',
				name: 'owner1',
				displayName: 'owner1',
				username: 'owner1',
				roles: [],
				email: 'test@mail.com',
				surname: 'surname1',
				principalRole: admin
			},
			startDate: new Date(),
			delegates: [],
			icon: webIcon,
			applicationData: {
				appMaintenance: 'appMaintenance',
				operationSupplier: 'operationSupplier',
				appServers: 'AppServers',
				appServersOS: 'App Servers OS'
			},
			allowModifyOwner: true,
			dueDate: new Date(2024, 6, 7),
			narrativeName: 'Narrative1'
		},
		{
			id: 'id2',
			name: 'App Name 2',
			codeName: 'Code Name',
			description: '',
			lastReview: new Date(),
			lastModify: new Date(),
			owner: {
				id: '2',
				name: 'owner2',
				displayName: 'owner2',
				username: 'owner2',
				roles: [],
				email: 'test@mail.com',
				surname: 'surname1',
				principalRole: admin
			},
			delegates: [],
			icon: webIcon,
			applicationData: {
				appMaintenance: 'appMaintenance',
				operationSupplier: 'operationSupplier',
				appServers: 'AppServers',
				appServersOS: 'App Servers OS'
			},
			allowModifyOwner: true,
			startDate: new Date(2022, 5, 7),
			dueDate: new Date(2022, 6, 7),
			narrativeName: 'Narrative2'
		}
	];
};

export default () => useQuery(['reviewApps'], useGetAppsReview);
