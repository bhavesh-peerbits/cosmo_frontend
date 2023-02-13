import CosmoTable from '@components/table/CosmoTable';
import Asset from '@model/Narrative/Asset';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { TrashCan } from '@carbon/react/icons';
import { useForm, UseFormSetValue } from 'react-hook-form';
import { PathDto } from 'cosmo-api/src/v1';
import { AssetFormData } from './AssetTileForm';

type PathsFormData = {
	path: string[];
};

type AssetPathsTableProps = {
	readOnly?: boolean;
	assetPaths: PathDto[];
	setValue: UseFormSetValue<AssetFormData>;
	asset: Asset;
};

const AssetPathsTable = ({
	assetPaths,
	setValue,
	readOnly,
	asset
}: AssetPathsTableProps) => {
	const { t } = useTranslation([
		'table',
		'applicationInstances',
		'modals',
		'changeMonitoring'
	]);
	const form = useForm<PathsFormData>();

	const columns = useMemo<ColumnDef<PathDto, unknown, PathsFormData>[]>(
		() => [
			{
				id: `path-${asset.id}`,
				header: 'Path',
				accessorFn: row => row.path,
				sortUndefined: 1,
				meta: {
					modalInfo: {
						type: 'string',
						id: 'path',
						validation: {
							required: { value: true, message: t('modals:field-required') },
							pattern: {
								value: asset.os === 'WINDOWS' ? /^(?!s*$)[^/]+/ : /^(?!s*$)[^\\]+/,
								message: t('applicationInstances:path-regex-error', {
									regex: asset.os === 'WINDOWS' ? '/^(?!s*$)[^/]+/' : ' /^(?!s*$)[^\\]+/'
								})
							}
						}
					}
				}
			}
		],
		[asset.id, t, asset.os]
	);

	return (
		<Grid narrow fullWidth>
			<FullWidthColumn>
				<Layer>
					<CosmoTable
						modalProps={{
							form,
							onSubmit: data =>
								setValue(
									'paths',
									[
										...assetPaths,
										...data.path
											.filter(
												path =>
													!assetPaths
														.map(p => p.path.toLowerCase())
														.includes(path.toLowerCase())
											)
											.map(path => {
												return { path, id: 0 };
											})
									],
									{ shouldDirty: true }
								),
							title: t('changeMonitoring:add-path')
						}}
						tableId={`${asset.id}-instance-path-table`}
						columns={columns}
						isColumnOrderingEnabled
						toolbar={{
							searchBar: true,
							toolbarBatchActions: [],
							toolbarTableMenus: []
						}}
						canDelete
						onDelete={data => {
							setValue(
								'paths',
								assetPaths.filter(path => !data.find(p => p.original.path === path.path)),
								{ shouldDirty: true }
							);
						}}
						inlineActions={[
							{
								label: t('modals:delete'),
								icon: <TrashCan />,
								onClick: data => {
									setValue(
										'paths',
										assetPaths.filter(path => path.path !== data.original.path),
										{ shouldDirty: true }
									);
								}
							}
						]}
						canAdd={!readOnly}
						exportFileName={({ all }) =>
							all ? 'monitoring-drafts-all' : 'monitoring-drafts-selection'
						}
						data={assetPaths}
						isSelectable
						noDataMessage={t('applicationInstances:no-path')}
						noDataMessageSubtitle={
							!readOnly
								? t('applicationInstances:no-path-subtitle')
								: t('applicationInstances:no-path-asset')
						}
					/>
				</Layer>
			</FullWidthColumn>
		</Grid>
	);
};
export default AssetPathsTable;
