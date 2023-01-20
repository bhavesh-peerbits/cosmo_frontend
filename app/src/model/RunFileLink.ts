import { RunFileLinkApi } from 'cosmo-api';
import { PathDto } from 'cosmo-api/src/v1';
import FileLink from './FileLink';

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
