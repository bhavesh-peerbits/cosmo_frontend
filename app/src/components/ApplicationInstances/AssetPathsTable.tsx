import CosmoTable from '@components/table/CosmoTable';
import Asset from '@model/Asset';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { TrashCan } from '@carbon/react/icons';
import { useForm } from 'react-hook-form';

type PathsFormData = {
	path: string[];
};

type AssetPathsTableProps = {
	readOnly?: boolean;
	assetPaths: { path: string }[];
	setAssetPaths: Dispatch<SetStateAction<{ path: string }[]>>;
	asset: Asset;
};

const AssetPathsTable = ({
	assetPaths,
	setAssetPaths,
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

	const columns = useMemo<ColumnDef<{ path: string }, unknown, PathsFormData>[]>(
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
			},
			{
				id: `monitoring-${asset.id}`,
				header: t('applicationInstances:monitorings')
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
								setAssetPaths(old => [
									...old,
									...data.path.map(path => {
										return { path };
									})
								]),
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
						canEdit
						onDelete={data => {
							setAssetPaths(old =>
								old.filter(path => !data.find(p => p.original.path === path.path))
							);
						}}
						inlineActions={[
							{
								label: t('modals:delete'),
								icon: <TrashCan />,
								onClick: data => {
									setAssetPaths(old =>
										old.filter(path => path.path !== data.original.path)
									);
								}
							}
						]}
						canAdd={!!readOnly}
						exportFileName={({ all }) =>
							all ? 'monitoring-drafts-all' : 'monitoring-drafts-selection'
						}
						data={assetPaths}
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
