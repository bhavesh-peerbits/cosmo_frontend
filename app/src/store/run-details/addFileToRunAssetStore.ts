import FileLink from '@model/FileLink';
import { atom } from 'recoil';

const addFileToRunAssetStore = atom<{
	isOpen: boolean;
	path: string;
	old?: boolean;
	possiblePreviousFiles: FileLink[];
	possibleCurrentFiles: FileLink[];
}>({
	key: 'addFileToRunAssetStore',
	default: {
		isOpen: false,
		path: '',
		old: undefined,
		possiblePreviousFiles: [],
		possibleCurrentFiles: []
	}
});

export default addFileToRunAssetStore;
