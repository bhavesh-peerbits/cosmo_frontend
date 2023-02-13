import { FileForDeltaDto } from 'cosmo-api/src/v1';
import FileLink, { toFileLinkApi } from '../common/FileLink';

interface FileForDelta {
	path: string[];
	old: boolean;
	fileLink?: FileLink;
}
export const toFileForDeltaApi = (fileForDelta: FileForDelta): FileForDeltaDto => {
	return {
		fileLink: fileForDelta.fileLink ? toFileLinkApi(fileForDelta.fileLink) : undefined,
		old: fileForDelta.old,
		path: fileForDelta.path
	};
};

export default FileForDelta;
