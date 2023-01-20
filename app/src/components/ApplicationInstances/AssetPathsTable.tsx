import CosmoTable from '@components/table/CosmoTable';
import Asset from '@model/Asset';
import { ColumnDef } from '@tanstack/react-table';
import { PathDto } from 'cosmo-api/src/v1';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';

type AssetPathsTableProps = {
	asset: Asset;
};

const AssetPathsTable = ({ asset }: AssetPathsTableProps) => {
	const { t } = useTranslation(['table', 'applicationInstances']);
	const columns = useMemo<ColumnDef<PathDto>[]>(() => {
		const ArrayCol: ColumnDef<PathDto>[] = [
			{
				id: `path-${asset.id}`,
				accessorFn: row => row.path,
				header: 'Path',
				sortUndefined: 1
				// meta: {
				// 	modalInfo: {
				// 		type: 'string',
				// 		modelKeyName: 'requestBody',
				// 		validation: {
				// 			required: true,
				// 			pattern:
				// 				assetData?.[0].asset.os === 'WINDOWS' ? '^(?!s*$)[^/]+' : '^(?!s*$)[^\\]+'
				// 		}
				// 	}
				// }
			}
		];
		return ArrayCol;
	}, [asset.id]);
	return (
		<Grid narrow fullWidth>
			<FullWidthColumn>
				<Layer>
					<CosmoTable
						tableId={`${asset.id}-instance-path-table`}
						columns={columns}
						isColumnOrderingEnabled
						toolbar={{
							searchBar: true,
							toolbarBatchActions: [],
							toolbarTableMenus: []
						}}
						exportFileName={({ all }) =>
							all ? 'monitoring-drafts-all' : 'monitoring-drafts-selection'
						}
						data={asset.paths || []}
						isSelectable
						noDataMessage={t('applicationInstances:no-path')}
						noDataMessageSubtitle={t('applicationInstances:no-path-subtitle')}
					/>
				</Layer>
			</FullWidthColumn>
		</Grid>
	);
};
export default AssetPathsTable;
