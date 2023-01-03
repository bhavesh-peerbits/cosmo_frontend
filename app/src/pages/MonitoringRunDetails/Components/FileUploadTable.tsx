import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { Upload } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Layer } from '@carbon/react';

type FileUploadTableProps = {
	period: 'current' | 'previous';
	data: {
		assetId: string;
		path: string;
		fileLastRun?: string;
		file: string;
	}[];
	assetId: string;
	setData: Dispatch<
		SetStateAction<
			{ assetId: string; path: string; fileLastRun?: string; file: string }[]
		>
	>;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FileUploadTable = ({ data, assetId, setData, period }: FileUploadTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table', 'runDetails']);

	// TODO Use tag for files
	const columns = useMemo<
		ColumnDef<{ path: string; fileLastRun?: string; file: string }>[]
	>(() => {
		const ArrayCol: ColumnDef<{ path: string; fileLastRun?: string; file: string }>[] = [
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
				canAdd
			/>
		</Layer>
	);
};
export default FileUploadTable;
