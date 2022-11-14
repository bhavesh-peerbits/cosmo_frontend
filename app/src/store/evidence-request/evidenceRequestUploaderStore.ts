import { atom } from 'recoil';

const evidenceRequestUploaderStore = atom<{
	isOpen: boolean;
	saveUpload: boolean;
	uploadSuccess: boolean;
	publicComment: string;
	privateComment?: string;
	requestText?: string;
	isDirty: boolean;
	isLoading: boolean;
}>({
	key: 'evidenceRequestUploaderStore',
	default: {
		isOpen: false,
		saveUpload: false,
		uploadSuccess: false,
		publicComment: '',
		privateComment: undefined,
		requestText: undefined,
		isDirty: false,
		isLoading: false
	}
});

export default evidenceRequestUploaderStore;
