import CosmoTable from '@components/table/CosmoTable';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';
import { useMemo } from 'react';
import { CheckmarkFilled } from '@carbon/react/icons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CellBoolean = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as boolean;
	return value && <CheckmarkFilled />;
};

const PathAssetTable = () => {
	const columns = useMemo<ColumnDef<{ included: boolean; path: string }>[]>(() => {
		const ArrayCol: ColumnDef<{ included: boolean; path: string }>[] = [
			{
				id: `included-all-asset`,
				accessorFn: row => row.included,
				cell: CellBoolean,
				header: 'Included'
			},

			{
				id: `path-all-asset`,
				accessorFn: row => row.path,
				header: 'Path',
				sortUndefined: 1
			}
		];
		return ArrayCol;
	}, []);
	return (
		<CosmoTable
			tableId='prova'
			columns={columns}
			noDataMessage={t('table:no-data')}
			isColumnOrderingEnabled
			toolbar={{
				searchBar: true,
				toolbarBatchActions: [],
				toolbarTableMenus: []
			}}
			exportFileName={({ all }) => (all ? 'answers-all' : 'answers-selection')}
			data={[
				{
					included: true,
					path: 'path1veryveryveryveryveryveryveryveryveryveryveryveryveryveryveryverylong'
				},
				{ included: false, path: 'path2' },
				{ included: true, path: 'path3' },
				{ included: true, path: 'path4' }
			]}
			isSelectable
		/>
	);
};
export default PathAssetTable;
