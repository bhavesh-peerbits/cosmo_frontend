import Application from '@model/Narrative/Application';
import User from '@model/User';
import { atom } from 'recoil';

const RevalidationReminderStore = atom<{
	open?: boolean;
	applications?: Application[];
	userApp: Map<string, { users: User[]; appId: string }>;
	middleApp?: Application;
	selected: Map<string, User[]>;
}>({
	key: 'revalidationReminderStore',
	default: {
		open: false,
		applications: [],
		userApp: new Map(),
		middleApp: undefined,
		selected: new Map()
	}
});

export default RevalidationReminderStore;
