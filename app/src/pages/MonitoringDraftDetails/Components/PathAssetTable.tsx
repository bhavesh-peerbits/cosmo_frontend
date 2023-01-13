import CosmoTable from '@components/table/CosmoTable';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { CheckmarkFilled, CheckmarkOutline, SubtractAlt } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { PathMonitoringDto } from 'cosmo-api/src/v1';
import MonitoringAsset from '@model/MonitoringAsset';
import useCheckPathAssetMonitoring from '@api/change-monitoring/useCheckPathsAsset';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BooleanCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as boolean;
	return value ? <CheckmarkFilled /> : 'Non incluso';
};

type PathAssetTableProps = {
	assetId: string;
	assetData?: MonitoringAsset[];
	setAssetData?: Dispatch<SetStateAction<MonitoringAsset[] | undefined>>;
	canAdd?: boolean;
};
const PathAssetTable = ({
	assetId,
	canAdd,
	setAssetData,
	assetData
}: PathAssetTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table']);
	const [newPaths, setNewPaths] = useState<PathMonitoringDto[]>([]);

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
					modalInfo: {
						type: 'string',
						modelKeyName: 'body',
						validation: { required: true }
					}
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
	}, [assetData, assetId, t]);

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
			icon: SubtractAlt,
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

	return (
		<CosmoTable
			modalProps={{
				mutation: useCheckPathAssetMonitoring(),
				title: t('changeMonitoring:add-path'),
				setMutationResult: setNewPaths,
				mutationDefaultValues: { assetId }
			}}
			tableId={`${assetId}-path-table`}
			columns={columns}
			noDataMessage={t('table:no-data')}
			isColumnOrderingEnabled
			canAdd={canAdd}
			toolbar={{
				searchBar: true,
				toolbarBatchActions: canAdd ? toolbarBatchActions : [],
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
