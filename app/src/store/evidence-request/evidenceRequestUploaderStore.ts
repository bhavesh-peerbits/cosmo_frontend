import { atom } from 'recoil';

const evidenceRequestUploaderStore = atom<{
	isOpen: boolean;
	saveUpload: boolean;
	uploadSuccess: boolean;
	publicComment: string;
	isDirty: boolean;
}>({
	key: 'evidenceRequestUploaderStore',
	default: {
		isOpen: false,
		saveUpload: false,
		uploadSuccess: false,
		publicComment: '',
		isDirty: false
	}
});

export default evidenceRequestUploaderStore;
