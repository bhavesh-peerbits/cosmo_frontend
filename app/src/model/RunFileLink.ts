import { RunFileLinkApi } from 'cosmo-api';
import { PathDto } from 'cosmo-api/src/v1';
import FileLink, { toFileLinkApi } from './FileLink';

interface RunFileLink {
	id: string;
	fileLink: FileLink;
	path: PathDto;
	old?: boolean;
}

export default RunFileLink;

export const fromRunFileLinkApi = (runFileLinkApi: RunFileLinkApi): RunFileLink => ({
	id: `${runFileLinkApi.id}`,
	fileLink: fromRunFileLinkApi(runFileLinkApi),
	path: runFileLinkApi.path,
	old: runFileLinkApi.old
});

export const toRunFileLinkApi = (runFileLink: RunFileLink): RunFileLinkApi => ({
	id: +runFileLink.id,
	fileLink: toFileLinkApi(runFileLink),
	path: runFileLink.path,
	old: runFileLink.old
});
