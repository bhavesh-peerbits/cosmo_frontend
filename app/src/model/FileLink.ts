import { FileLinkApi } from 'cosmo-api';

interface FileLink {
	id?: string;
	link?: string;
	type?: string;
	name?: string;
	dimension?: number;
	expirationTime?: Date;
}

export const fromFileLinkApi = (fileLinks: FileLinkApi): FileLink => {
	return {
		type: fileLinks.type,
		name: fileLinks.name,
		expirationTime: fileLinks.expirationTime
			? new Date(fileLinks.expirationTime)
			: undefined,
		id: `${fileLinks.id}`,
		link: fileLinks.link,
		dimension: fileLinks.dimension
	};
};

export default FileLink;
