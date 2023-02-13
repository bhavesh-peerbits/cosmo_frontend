import FileLink from '@model/common/FileLink';
import { atom } from 'recoil';

const evidenceRequestUploaderStore = atom<{
	isOpen: boolean;
	saveUpload: boolean;
	uploadSuccess: boolean;
	publicComment: string;
	privateComment?: string;
	requestText?: string;
	isDirty: boolean;
	dueDate?: Date;
	files?: FileLink[];
	isLoading: boolean;
	avoidNot?: boolean;
	isOnlyUpload?: boolean;
}>({
	key: 'evidenceRequestUploaderStore',
	default: {
		isOpen: false,
		saveUpload: false,
		uploadSuccess: false,
		publicComment: '',
		privateComment: undefined,
		requestText: undefined,
		dueDate: undefined,
		isDirty: false,
		files: undefined,
		isLoading: false
	}
});

export default evidenceRequestUploaderStore;
