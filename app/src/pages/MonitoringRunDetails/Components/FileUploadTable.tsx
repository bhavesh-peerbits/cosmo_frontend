import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Upload } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Layer } from '@carbon/react';
import { useRecoilState } from 'recoil';
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
};
const FileUploadTable = ({ data, assetId, period }: FileUploadTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table', 'runDetails']);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [addFileInfo, setAddFileInfo] = useRecoilState(addFileToRunAssetStore);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectedRows, setSelectedRows] = useState([]);
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
				header: 'File'
			}
		];
		if (period === 'previous') {
			ArrayCol.splice(1, 0, {
				id: `file-last-run-${assetId}`,
				accessorFn: row => row.fileLastRun,
				cell: TagFileLinkCell,
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
			onClick: () => {}
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
				// onRowSelection={row => setSelectedRows([row])}
				noDataMessage={t('table:no-data')}
				isColumnOrderingEnabled
				toolbar={{
					searchBar: true,
					toolbarBatchActions,
					toolbarTableMenus: []
				}}
				exportFileName={({ all }) => (all ? 'file-upload-all' : 'file-upload-selection')}
				data={data}
				isSelectable
				inlineActions={[
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
				]}
			/>
		</Layer>
	);
};
export default FileUploadTable;
