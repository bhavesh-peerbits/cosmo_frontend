import FileLink from '@model/FileLink';
import { CellContext } from '@tanstack/react-table';
import { Tag } from '@carbon/react';
import { Download } from '@carbon/react/icons';
import useGetFile from '@api/uploaders3/useGetFile';

const TagFileLinkCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as FileLink;
	const DownloadFile = (fileLink: FileLink) => {
		useGetFile(fileLink.id).then(({ data, headers }) => {
			const fileName =
				headers['content-disposition']
					?.split('filename=')?.[1]
					?.replace(/^"/, '')
					?.replace(/"$/, '') || `${fileLink.name}`;
			const fileBlob = new Blob([data as unknown as BlobPart]);
			const dataUrl = URL.createObjectURL(fileBlob);
			const link = document.createElement('a');
			link.download = fileName;
			link.href = dataUrl;
			link.click();
		});
	};
	return value ? (
		<Tag key={value.name} size='md' type='gray'>
			<button
				type='button'
				className='flex space-x-2'
				onClick={() => DownloadFile(value)}
			>
				<Download />
				<span className='text-link-primary hover:text-link-primary-hover hover:underline'>
					{value.name}
				</span>
			</button>
		</Tag>
	) : null;
};
export default TagFileLinkCell;
