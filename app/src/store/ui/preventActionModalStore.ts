import { atom } from 'recoil';

const preventActionModalStore = atom<{
	isOpen: boolean;
	onSuccess: () => void;
	message: string;
}>({
	key: 'preventActionModalStore',
	default: {
		isOpen: false,
		onSuccess: () => {},
		message: 'Are you sure u want to change page?'
	}
});

export default preventActionModalStore;
