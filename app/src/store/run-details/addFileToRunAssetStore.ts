import FileLink from '@model/FileLink';
import { atom } from 'recoil';

const addFileToRunAssetStore = atom<{
	isOpen: boolean;
	path: string[];
	old: boolean;
	previousRunFileId?: string;
	possiblePreviousFiles: FileLink[];
	possibleCurrentFiles: FileLink[];
}>({
	key: 'addFileToRunAssetStore',
	default: {
		isOpen: false,
		path: [],
		old: false,
		possiblePreviousFiles: [],
		possibleCurrentFiles: []
	}
});

export default addFileToRunAssetStore;
