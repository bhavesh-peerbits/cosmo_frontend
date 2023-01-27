import FileLink from '@model/FileLink';
import { CellContext } from '@tanstack/react-table';
import { Tag } from '@carbon/react';
import { Download } from '@carbon/react/icons';
import useGetFile from '@api/uploaders3/useGetFile';

const MultiTagFileLinkCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as FileLink[];
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
		<div>
			{value.map(file => (
				<Tag key={file.name} size='md' type='gray' className='ml-0'>
					<button type='button' className='flex' onClick={() => DownloadFile(file)}>
						<Download />
						<span className='w-max-13 text-ellipsis text-link-primary line-clamp-1 hover:text-link-primary-hover hover:underline'>
							{file.name}
						</span>
					</button>
				</Tag>
			))}
		</div>
	) : null;
};
export default MultiTagFileLinkCell;
