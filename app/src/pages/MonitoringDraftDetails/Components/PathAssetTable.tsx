import CosmoTable from '@components/table/CosmoTable';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { MisuseOutline, CheckmarkOutline } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { PathMonitoringDto, RunDtoStatusEnum } from 'cosmo-api/src/v1';
import useCheckPathAssetMonitoring from '@api/change-monitoring/useCheckPathsAsset';
import useNotification from '@hooks/useNotification';
import { RunMonitoringAsset } from '../types/RunMonitoringAsset';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BooleanCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as boolean;
	return value ? <CheckmarkOutline /> : <MisuseOutline />;
};

interface PathAssetTableProps {
	assetId: string;
	assetData?: RunMonitoringAsset[];
	setAssetData?: Dispatch<SetStateAction<RunMonitoringAsset[] | undefined>>;
	canAdd?: boolean;
	status?: RunDtoStatusEnum;
}
const PathAssetTable = ({
	assetId,
	canAdd,
	assetData,
	setAssetData,
	status
}: PathAssetTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table']);
	const [newPaths, setNewPaths] = useState<PathMonitoringDto[]>([]);
	const { showNotification } = useNotification();

	const columns = useMemo<ColumnDef<PathMonitoringDto>[]>(() => {
		const ArrayCol: ColumnDef<PathMonitoringDto>[] = [
			{
				id: `selected-${assetId}`,
				accessorFn: row => row.selected,
				cell: BooleanCell,
				header: t('changeMonitoring:included')
			},
			{
				id: `path-${assetId}`,
				accessorFn: row => row.path,
				header: 'Path',
				sortUndefined: 1,
				meta: {
					// modalInfo: {
					// 	type: 'string',
					// 	modelKeyName: 'requestBody',
					// 	validation: {
					// 		required: true,
					// 		pattern:
					// 			assetData?.[0].asset.os === 'WINDOWS' ? '^(?!s*$)[^/]+' : '^(?!s*$)[^\\]+'
					// 	}
					// } FIXME
				}
			}
		];
		if (assetData?.some(el => el.paths.filter(path => path.monitoring?.length))) {
			ArrayCol.push({
				id: `monitorings-path-${assetId}`,
				accessorFn: row => row.monitoring,
				header: t('changeMonitoring:monitorings'),
				enableGrouping: false
			});
		}
		return ArrayCol;
	}, [assetId, assetData, t]);

	const toolbarBatchActions = [
		{
			id: 'include',
			label: t('changeMonitoring:include'),
			icon: CheckmarkOutline,
			onClick: (selectionElements: PathMonitoringDto[]) => {
				setAssetData &&
					setAssetData(old => {
						return old?.map(el => {
							if (el.asset.id === assetId) {
								return {
									...el,
									paths: el.paths.map(path => {
										if (selectionElements.includes(path)) {
											return { ...path, selected: true };
										}
										return path;
									})
								};
							}
							return el;
						});
					});
			}
		},
		{
			id: 'exclude',
			label: t('changeMonitoring:exclude'),
			icon: MisuseOutline,
			onClick: (selectionElements: PathMonitoringDto[]) => {
				setAssetData &&
					setAssetData(old => {
						return old?.map(el => {
							if (el.asset.id === assetId) {
								return {
									...el,
									paths: el.paths.map(path => {
										if (selectionElements.includes(path)) {
											return { ...path, selected: false };
										}
										return path;
									})
								};
							}
							return el;
						});
					});
			}
		}
	];

	useEffect(() => {
		setAssetData &&
			setAssetData(old =>
				old?.map(el => {
					return el.asset.id === assetId
						? {
								...el,
								paths: [
									...el.paths,
									...newPaths
										.filter(e => !el.paths.some(p => p.path === e.path))
										.map(element => {
											return { ...element, selected: true };
										})
								]
						  }
						: el;
				})
			);
	}, [assetId, newPaths, setAssetData]);

	useEffect(() => {
		newPaths.some(p => p.monitoring?.length) &&
			showNotification({
				title: t('changeMonitoring:already-monitored-toast'),
				message: t('changeMonitoring:already-monitored-description'),
				type: 'warning'
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newPaths]);

	return (
		<CosmoTable
			// modalProps={{
			// 	mutation: useCheckPathAssetMonitoring(),
			// 	title: t('changeMonitoring:add-path'),
			// 	setMutationResult: setNewPaths,
			// 	mutationDefaultValues: { assetId }
			// }} FIXME use new props
			tableId={`${assetId}-path-table`}
			columns={columns}
			noDataMessage={t('table:no-data')}
			isColumnOrderingEnabled
			canAdd={status ? status === 'SETUP' && canAdd : canAdd}
			toolbar={{
				searchBar: true,
				// eslint-disable-next-line no-nested-ternary
				toolbarBatchActions: status
					? status === 'SETUP' && canAdd
						? toolbarBatchActions
						: []
					: canAdd
					? toolbarBatchActions
					: [],
				toolbarTableMenus: []
			}}
			exportFileName={({ all }) =>
				all ? 'monitoring-drafts-all' : 'monitoring-drafts-selection'
			}
			data={assetData?.find(el => el.asset.id === assetId)?.paths || []}
			isSelectable
			noDataMessageSubtitle={t('changeMonitoring:no-path-subtitle')}
		/>
	);
};
export default PathAssetTable;
