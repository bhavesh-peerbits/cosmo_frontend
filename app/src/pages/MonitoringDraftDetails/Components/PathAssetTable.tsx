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
	isSameSetup?: boolean;
	canAdd?: boolean;
	globalData?: {
		path: string;
		selected?: boolean;
	}[];
	setGlobalData?: Dispatch<
		SetStateAction<
			{
				path: string;
				selected?: boolean;
			}[]
		>
	>;
};
const PathAssetTable = ({
	isSameSetup,
	globalData,
	assetId,
	canAdd,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setGlobalData,
	setAssetData,
	assetData
}: PathAssetTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table']);

	const columns = useMemo<
		ColumnDef<{ path: string; selected?: boolean } | PathMonitoringDto>[]
	>(() => {
		const ArrayCol: ColumnDef<
			{ path: string; selected?: boolean } | PathMonitoringDto
		>[] = [
			{
				id: isSameSetup ? 'selected-same-setup' : `selected-${assetId}`,
				accessorFn: row => row.selected,
				cell: BooleanCell,
				header: t('changeMonitoring:included')
			},
			{
				id: isSameSetup ? 'path-same-setup' : `path-${assetId}`,
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
		return ArrayCol;
	}, [assetId, isSameSetup, t]);

	const toolbarBatchActions = [
		{
			id: 'include',
			label: t('changeMonitoring:include'),
			icon: CheckmarkOutline,
			onClick: () => {}
			// onClick: (selectionElements: { path: string; selected?: boolean }[]) => {
			// 	setGlobalData(old =>
			// 		old.map(element => {
			// 			return selectionElements.includes(element)
			// 				? { ...element, selected: true }
			// 				: element;
			// 		})
			// 	);
			// }
		},
		{
			id: 'exclude',
			label: t('changeMonitoring:exclude'),
			icon: SubtractAlt,
			onClick: () => {}
			// onClick: (selectionElements: { path: string; selected?: boolean }[]) => {
			// 	setGlobalData(old =>
			// 		old.map(element => {
			// 			return selectionElements.includes(element)
			// 				? { ...element, selected: false }
			// 				: element;
			// 		})
			// 	);
			// }
		}
	];

	const [prova, setProva] = useState<PathMonitoringDto[]>([]);

	useEffect(() => {
		setAssetData &&
			setAssetData(old =>
				old?.map(el => {
					return el.asset.id === assetId
						? {
								id: el.id,
								asset: el.asset,
								paths: el.paths ? [...new Set([...el.paths, ...prova])] : [...prova]
						  }
						: el;
				})
			);
	}, [assetId, prova, setAssetData]);

	return (
		<CosmoTable
			modalProps={{
				mutation: useCheckPathAssetMonitoring(),
				title: 'path',
				setMutationResult: setProva,
				mutationDefaultValues: { assetId }
			}}
			tableId='path-asset-table'
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
			data={
				isSameSetup
					? globalData || []
					: assetData?.find(el => el.asset.id === assetId)?.paths || []
			}
			isSelectable
			// noDataMessageSubtitle={
			// 	globalData?.length > 0
			// 		? t('changeMonitoring:no-path-subtitle')
			// 		: t('changeMonitoring:no-path-yet')
			// }
		/>
	);
};
export default PathAssetTable;
