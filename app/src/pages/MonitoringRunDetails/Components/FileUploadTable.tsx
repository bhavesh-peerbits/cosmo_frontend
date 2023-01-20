import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Upload } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Layer } from '@carbon/react';
import { useRecoilState } from 'recoil';
import addFileToRunAssetStore from '@store/run-details/addFileToRunAssetStore';

interface UploadFileTableItem {
	path: string;
	fileLastRun?: string;
	file?: string;
}

type FileUploadTableProps = {
	period: 'current' | 'previous';
	data: {
		path: string;
		fileLastRun?: string;
		file?: string;
	}[];
	assetId: string;
};
const FileUploadTable = ({ data, assetId, period }: FileUploadTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table', 'runDetails']);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [addFileInfo, setAddFileInfo] = useRecoilState(addFileToRunAssetStore);
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
				accessorFn: row => row.file,
				header: 'File'
			}
		];
		if (period === 'previous') {
			ArrayCol.splice(1, 0, {
				id: `file-last-run-${assetId}`,
				accessorFn: row => row.fileLastRun,
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
							setAddFileInfo(old => ({ ...old, isOpen: true, path: row.original.path }));
						}
					}
				]}
			/>
		</Layer>
	);
};
export default FileUploadTable;
