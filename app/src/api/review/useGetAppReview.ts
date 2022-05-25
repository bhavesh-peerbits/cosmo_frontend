import { icons } from '@components/IconPicker';
import { UserDisplayRole } from '@model/UserRole';

const admin: UserDisplayRole = 'Admin';
const webIcon: keyof typeof icons = icons.web.component;
const useGetAppReview = () => {
	return {
		id: '1',
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
		dueDate: new Date(2024, 6, 7),
		narrativeName: 'Narrative1'
	};
};

export default () => useGetAppReview();
