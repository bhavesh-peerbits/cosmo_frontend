import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import Monitoring from '@model/ChangeMonitoring/Monitoring';
import { useMemo } from 'react';
import DateCell from '@components/table/Cell/DateCell';
import { Layer } from '@carbon/react';
import CellLink from '@components/table/Cell/CellLink';

type MonitoringDashboardTableProps = {
	monitorings: Monitoring[];
};
const MonitoringDashboardTable = ({ monitorings }: MonitoringDashboardTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'monitoringDashboard', 'table']);

	const columns = useMemo<ColumnDef<Monitoring>[]>(() => {
		const ArrayCol: ColumnDef<Monitoring>[] = [
			{
				id: 'monitoring-name',
				accessorFn: row => row.name,
				cell: info => CellLink({ info, preUrl: '/monitoring-dashboard/' }),
				header: t('changeMonitoring:monitoring-name'),
				sortUndefined: 1
			},
			{
				id: 'frequency',
				accessorFn: row => t(`changeMonitoring:${row.scheduling.frequency}`),
				header: t('changeMonitoring:frequency'),
				meta: { filter: { type: 'multiselect' } }
			},
			{
				id: 'start-date',
				accessorFn: row => row.scheduling.startDate,
				header: t('changeMonitoring:start-date'),
				cell: DateCell
			},
			{
				id: 'end-date',
				accessorFn: row => row.scheduling.endDate,
				header: t('changeMonitoring:end-date'),
				cell: DateCell
			},
			{
				id: 'total-runs',
				accessorFn: row => row.scheduling.totalRuns,
				header: t('changeMonitoring:total-runs')
			},
			{
				id: 'current-run',
				accessorFn: row => row.currentRun,
				header: t('monitoringDashboard:current-run')
			},
			{
				id: 'status',
				accessorFn: row => t(`changeMonitoring:${row.status}`),
				header: t('monitoringDashboard:status'),
				meta: { filter: { type: 'checkbox' } }
			},
			{
				id: 'framework',
				accessorFn: row => row.frameworkLeafsCodes,
				header: t('changeMonitoring:framework-leafs')
			},
			{
				id: 'controls',
				accessorFn: row => row.controlCode,
				header: t('changeMonitoring:control-code')
			}
		];
		return ArrayCol;
	}, [t]);

	return (
		<Layer>
			<CosmoTable
				tableId='monitoring-dashboard-table'
				columns={columns}
				isColumnOrderingEnabled
				toolbar={{
					searchBar: true,
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
				exportFileName={({ all }) => (all ? 'monitorings-all' : 'monitorings-selection')}
				data={monitorings}
				isSelectable
				noDataMessage={t('changeMonitoring:no-monitoring')}
				noDataMessageSubtitle={t('changeMonitoring:no-monitoring-subtitle')}
			/>
		</Layer>
	);
};
export default MonitoringDashboardTable;
