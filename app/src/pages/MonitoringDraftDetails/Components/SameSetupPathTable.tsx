import CosmoTable from '@components/table/CosmoTable';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { CheckmarkFilled, CheckmarkOutline, SubtractAlt } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import useCheckPathsMultiAssets from '@api/change-monitoring/useCheckPathsMultiAssets';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BooleanCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as boolean;
	return value && <CheckmarkFilled />;
};

type SameSetupPathTableProps = {
	assetIds: string[];
	globalData: {
		path: string;
		selected?: boolean;
		monitoring: string[];
	}[];
	setGlobalData?: Dispatch<
		SetStateAction<
			{
				path: string;
				selected?: boolean;
				monitoring: string[];
			}[]
		>
	>;
};
const SameSetupPathTable = ({
	assetIds,
	setGlobalData,
	globalData
}: SameSetupPathTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table']);

	const columns = useMemo<
		ColumnDef<{
			path: string;
			selected?: boolean;
			monitoring: string[];
		}>[]
	>(() => {
		const ArrayCol: ColumnDef<{
			path: string;
			selected?: boolean;
			monitoring: string[];
		}>[] = [
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
						modelKeyName: 'path',
						validation: { required: true }
					}
				}
			}
		];
		if (globalData.some(el => el.monitoring.length)) {
			ArrayCol.push({
				id: 'monitoring-same-setup',
				accessorFn: row => row.monitoring.join(', '),
				header: t('changeMonitoring:monitorings'),
				enableGrouping: false
			});
		}
		return ArrayCol;
	}, [globalData, t]);

	const toolbarBatchActions = [
		{
			id: 'include',
			label: t('changeMonitoring:include'),
			icon: CheckmarkOutline,
			onClick: () => {}
		},
		{
			id: 'exclude',
			label: t('changeMonitoring:exclude'),
			icon: SubtractAlt,
			onClick: () => {}
		}
	];

	return (
		<CosmoTable
			modalProps={{
				mutation: useCheckPathsMultiAssets(),
				title: t('changeMonitoring:add-path'),
				setMutationResult: setGlobalData,
				mutationDefaultValues: { assetIds }
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
			title={t('changeMonitoring:same-setup-title')}
			description={t('changeMonitoring:same-setup-description')}
		/>
	);
};
export default SameSetupPathTable;
