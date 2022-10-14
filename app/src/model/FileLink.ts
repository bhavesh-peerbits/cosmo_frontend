import { FileLinkApi } from 'cosmo-api';

interface FileLink {
	id?: string;
	link?: string;
	type?: string;
	name?: string;
	dimension?: number;
}

export const fromFileLinkApi = (fileLinks: FileLinkApi): FileLink => {
	return {
		type: fileLinks.type,
		name: fileLinks.name,
		id: `${fileLinks.id}`,
		link: fileLinks.link,
		dimension: fileLinks.dimension
	};
};

export default FileLink;
