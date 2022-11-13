import CosmoTable, { CellProperties, HeaderFunction } from '@components/table/CosmoTable';
import FileLink from '@model/FileLink';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useGetFile from '@api/uploaders3/useGetFile';

const FileLinkTable = ({ files }: { files: FileLink[] }) => {
	const { t } = useTranslation('evidenceRequest');

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

	const linkCell = useCallback(
		(info: CellProperties<FileLink, { file: FileLink }>) => (
			<div className='flex items-center space-x-2'>
				<button
					type='button'
					onClick={() => DownloadFile(info.getValue().file)}
					className='text-link-primary hover:text-link-primary-hover hover:underline'
				>
					{info.getValue().file.name}
				</button>
			</div>
		),
		[]
	);
	const columns: HeaderFunction<FileLink> = useCallback(
		table => [
			table.createDataColumn(row => ({ file: row }), {
				id: 'name',
				header: t('file-link-name'),
				cell: linkCell
			}),
			table.createDataColumn(row => row.type, {
				id: 'type',
				header: t('file-link-type')
			}),
			table.createDataColumn(row => row.dimension, {
				id: 'owner',
				header: `${t('file-link-dimension')} [Byte]`
			})
		],
		[linkCell, t]
	);
	return <CosmoTable createHeaders={columns} data={files} disableSearch />;
};

export default FileLinkTable;
