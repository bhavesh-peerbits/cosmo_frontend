import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Upload } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Layer } from '@carbon/react';
import { useSetRecoilState } from 'recoil';
import addFileToRunAssetStore from '@store/run-details/addFileToRunAssetStore';
import FileLink from '@model/FileLink';
import TagFileLinkCell from '@components/table/Cell/TagFileLinkCell';
import RunFileLink from '@model/RunFileLink';

interface UploadFileTableItem {
	path: string;
	fileLastRun?: FileLink;
	runFileLink?: RunFileLink;
}

type FileUploadTableProps = {
	period: 'current' | 'previous';
	data: {
		path: string;
		fileLastRun?: FileLink;
		runFileLink?: RunFileLink;
	}[];
	assetId: string;
	canEdit?: boolean;
};
const FileUploadTable = ({ data, assetId, period, canEdit }: FileUploadTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table', 'runDetails']);
	const setAddFileInfo = useSetRecoilState(addFileToRunAssetStore);
	const [selectedRows, setSelectedRows] = useState<UploadFileTableItem[]>([]);
	// TODO Use tag for files
	const columns = useMemo<ColumnDef<UploadFileTableItem>[]>(() => {
		const ArrayCol: ColumnDef<UploadFileTableItem>[] = [
			{
				id: `path-${assetId}`,
				accessorFn: row => row.path,
				header: 'Path',
				sortUndefined: 1
			},
			{
				id: `file-${assetId}`,
				accessorFn: row => row.runFileLink?.fileLink,
				cell: TagFileLinkCell,
				meta: { filter: { enabled: false } },
				header: 'File'
			}
		];
		if (period === 'previous') {
			ArrayCol.splice(1, 0, {
				id: `file-last-run-${assetId}`,
				accessorFn: row => row.fileLastRun,
				cell: TagFileLinkCell,
				meta: { filter: { enabled: false } },
				header: t('runDetails:last-run-file')
			});
		}
		return ArrayCol;
	}, [assetId, period, t]);

	const toolbarBatchActions = [
		{
			id: 'upload',
			label: 'Upload',
			icon: Upload,
			onClick: () => {
				setAddFileInfo(old => ({
					...old,
					isOpen: true,
					path: selectedRows.map(sr => sr?.path),
					selectedRow: selectedRows.map(sr => sr.runFileLink),
					old: period === 'previous'
				}));
			}
		}
	];
	// TODO change name of export file
	return (
		<Layer>
			<CosmoTable
				tableId={
					period === 'current'
						? `current-period-${assetId}`
						: `previous-period-${assetId}`
				}
				columns={columns}
				onRowSelection={row => setSelectedRows(row.map(r => r.original))}
				noDataMessage={t('table:no-data')}
				isColumnOrderingEnabled
				toolbar={{
					searchBar: true,
					toolbarBatchActions: canEdit ? toolbarBatchActions : [],
					toolbarTableMenus: []
				}}
				exportFileName={({ all }) => (all ? 'file-upload-all' : 'file-upload-selection')}
				data={data}
				isSelectable
				inlineActions={
					canEdit
						? [
								{
									label: t('runDetails:upload-file'),
									onClick: row => {
										setAddFileInfo(old => ({
											...old,
											isOpen: true,
											path: [row.original.path],
											previousRunFileId: row.original.fileLastRun?.id,
											selectedRow: row.original.runFileLink,
											old: period === 'previous'
										}));
									}
								}
						  ]
						: undefined
				}
			/>
		</Layer>
	);
};
export default FileUploadTable;
