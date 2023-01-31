import CosmoTable from '@components/table/CosmoTable';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { MisuseOutline, CheckmarkOutline } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { AssetOsEnum, PathMonitoringDto } from 'cosmo-api/src/v1';
import useNotification from '@hooks/useNotification';
import useCheckPathsMultiAsset from '@api/change-monitoring-analyst/useCheckPathsMultiAssets';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BooleanCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as boolean;
	return value ? <CheckmarkOutline /> : <MisuseOutline />;
};

type PathAssetTableFormData = {
	path: string[];
};

type SameSetupPathTableProps = {
	assetIds: string[];
	globalData: PathMonitoringDto[];
	setGlobalData?: Dispatch<SetStateAction<PathMonitoringDto[]>>;
	os?: AssetOsEnum;
};
const SameSetupPathTable = ({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	assetIds,
	setGlobalData,
	globalData,
	os
}: SameSetupPathTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table']);
	const [newPaths, setNewPaths] = useState<PathMonitoringDto[]>([]);
	const { showNotification } = useNotification();
	const { mutate } = useCheckPathsMultiAsset();
	const form = useForm<PathAssetTableFormData>();

	const columns = useMemo<
		ColumnDef<PathMonitoringDto, unknown, PathAssetTableFormData>[]
	>(() => {
		const ArrayCol: ColumnDef<PathMonitoringDto, unknown, PathAssetTableFormData>[] = [
			{
				id: 'selected-same-setup',
				accessorFn: row => row.selected,
				cell: BooleanCell,
				header: t('changeMonitoring:included')
			},
			{
				id: 'path-same-setup',
				accessorFn: row => row.path,
				header: 'Path',
				sortUndefined: 1,
				meta: {
					modalInfo: {
						type: 'string',
						id: 'path',
						validation: {
							required: { value: true, message: t('changeMonitoring:field-required') },
							pattern: {
								value: os === 'WINDOWS' ? /^(?!s*$)[^/]+/ : /^(?!s*$)[^\\]+/,
								message: 'to'
							}
						}
					}
				}
			}
		];
		if (globalData.some(el => el.monitoring?.length)) {
			ArrayCol.push({
				id: 'monitoring-same-setup',
				accessorFn: row => row.monitoring?.join(', '),
				header: t('changeMonitoring:monitorings'),
				enableGrouping: false
			});
		}
		return ArrayCol;
	}, [globalData, os, t]);

	const toolbarBatchActions = [
		{
			id: 'include',
			label: t('changeMonitoring:include'),
			icon: CheckmarkOutline,
			onClick: (selectionElements: PathMonitoringDto[]) => {
				setGlobalData &&
					setGlobalData(old => {
						return old?.map(el => {
							if (
								selectionElements.map(selectedEl => selectedEl.path).includes(el.path)
							) {
								return { ...el, selected: true };
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
				setGlobalData &&
					setGlobalData(old => {
						return old?.map(el => {
							if (
								selectionElements.map(selectedEl => selectedEl.path).includes(el.path)
							) {
								return { ...el, selected: false };
							}
							return el;
						});
					});
			}
		}
	];

	useEffect(() => {
		setGlobalData && setGlobalData(old => [...old, ...newPaths]);
	}, [newPaths, setGlobalData]);

	useEffect(() => {
		newPaths.some(p => p.monitoring?.length) &&
			showNotification({
				title: t('changeMonitoring:already-monitored-toast'),
				message: t('changeMonitoring:already-monitored-description'),
				type: 'warning'
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newPaths]);

	const checkPaths = (data: string[]) => {
		return mutate(
			{ assetIds, paths: data },
			{ onSuccess: resultData => setNewPaths(resultData) }
		);
	};

	return (
		<CosmoTable
			modalProps={{
				form,
				onSubmit: data => checkPaths(data.path),
				title: t('changeMonitoring:add-path')
			}}
			tableId='path-multi-asset-table'
			columns={columns}
			noDataMessage={t('table:no-data')}
			isColumnOrderingEnabled
			canAdd
			toolbar={{
				searchBar: true,
				toolbarBatchActions,
				toolbarTableMenus: []
			}}
			exportFileName={({ all }) =>
				all ? 'same-setup-paths-all' : 'same-setup-paths-selection'
			}
			data={globalData}
			isSelectable
			noDataMessageSubtitle={t('changeMonitoring:no-path-yet')}
		/>
	);
};
export default SameSetupPathTable;
