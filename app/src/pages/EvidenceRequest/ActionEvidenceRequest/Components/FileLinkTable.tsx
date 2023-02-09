import CosmoTable from '@components/table/CosmoTable';
import FileLink from '@model/FileLink';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useGetFile from '@api/uploaders3/useGetFile';
import { CellContext, ColumnDef } from '@tanstack/react-table';

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const linkCell = useCallback(({ getValue }: CellContext<any, unknown>) => {
		const value = getValue() as FileLink;
		return (
			<div className='flex items-center space-x-2'>
				<button
					type='button'
					onClick={() => DownloadFile(value)}
					className='text-link-primary hover:text-link-primary-hover hover:underline'
				>
					{value.name}
				</button>
			</div>
		);
	}, []);
	const columns = useMemo<ColumnDef<FileLink>[]>(
		() => [
			{
				id: 'name',
				accessorFn: row => row,
				header: t('file-link-name'),
				cell: linkCell
			},
			{
				id: 'type',
				accessorFn: row => row.type,
				header: t('file-link-type'),
				meta: { filter: { type: 'checkbox' } }
			},

			{
				id: 'owner',
				accessorFn: row => row.dimension,
				header: `${t('file-link-dimension')} [Byte]`,
				meta: { filter: { enabled: false } }
			}
		],
		[linkCell, t]
	);
	return (
		<CosmoTable
			tableId='filelinktable'
			columns={columns}
			data={files}
			toolbar={{ searchBar: true, toolbarBatchActions: [], toolbarTableMenus: [] }}
			isColumnOrderingEnabled
		/>
	);
};

export default FileLinkTable;
