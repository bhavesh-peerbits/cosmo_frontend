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

export const toFileLinkApi = (fileLinks: FileLink): FileLinkApi => {
	return {
		type: fileLinks.type,
		name: fileLinks.name,
		id: fileLinks.id ? +fileLinks.id : undefined,
		link: fileLinks.link,
		dimension: fileLinks.dimension
	};
};

export const fromFiletoFileLink = (file: File, path: string): FileLink => {
	return {
		type: file.type,
		name: file.name,
		id: undefined,
		link: `${path}/${file.name}`,
		dimension: file.size
	};
};

export default FileLink;
