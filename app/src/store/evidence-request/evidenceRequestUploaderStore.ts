import { atom } from 'recoil';

const evidenceRequestUploaderStore = atom<{
	isOpen: boolean;
	saveUpload: boolean;
	uploadSuccess: boolean;
	publicComment: string;
	isDirty: boolean;
	isLoading: boolean;
}>({
	key: 'evidenceRequestUploaderStore',
	default: {
		isOpen: false,
		saveUpload: false,
		uploadSuccess: false,
		publicComment: '',
		isDirty: false,
		isLoading: false
	}
});

export default evidenceRequestUploaderStore;
