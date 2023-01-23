import CosmoTable from '@components/table/CosmoTable';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import Monitoring from '@model/Monitoring';
import { useMemo } from 'react';
import DateCell from '@components/table/Cell/DateCell';
import { UnorderedList, ListItem, Layer } from '@carbon/react';
import { Link } from 'react-router-dom';
import useInboxMonitorings from '@hooks/inbox-monitoring/useInboxMonitorings';

const CellLink = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as { name?: string; id?: string; currentRunId: string };
	if (value.id) {
		return (
			<Link to={`/change-monitoring/${value.id}/${value.currentRunId}`}>
				{value.name}
			</Link>
		);
	}
	return <span>{value.name}</span>;
};

const BulletListCell = ({ getValue }: CellContext<any, unknown>) => {
	const { t } = useTranslation('evidenceRequest');

	const value = getValue() as string[];
	return value && value.length ? (
		<UnorderedList nested className='ml-0'>
			{value.map(val => {
				return <ListItem className='flex items-center space-x-2'>{val}</ListItem>;
			})}
		</UnorderedList>
	) : (
		<p>{t('no-control')}</p>
	);
};

const InboxMonitoringTable = () => {
	const { t } = useTranslation(['changeMonitoring', 'monitoringDashboard', 'table']);
	const { monitorings } = useInboxMonitorings();
	// TODO Fix meta export
	const columns = useMemo<ColumnDef<Monitoring>[]>(() => {
		const ArrayCol: ColumnDef<Monitoring>[] = [
			{
				id: 'monitoring-name',
				accessorFn: row => ({
					name: row.name,
					id: row.id,
					currentRunId: row.currentRun
				}),
				cell: CellLink,
				header: t('changeMonitoring:monitoring-name'),
				sortUndefined: 1
			},
			{
				id: 'frequency',
				accessorFn: row => row.scheduling.frequency,
				header: t('changeMonitoring:frequency')
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
				accessorFn: row => row.status,
				header: t('monitoringDashboard:status')
			},
			{
				id: 'framework',
				accessorFn: row => row.frameworkLeafsCodes,
				header: 'Framework'
			},
			{
				id: 'controls',
				accessorFn: row => row.controlCode,
				header: t('changeMonitoring:controls'),
				cell: BulletListCell
			}
		];
		return ArrayCol;
	}, [t]);

	return (
		<Layer>
			<CosmoTable
				tableId='inbox-monitoring-table'
				columns={columns}
				noDataMessage={t('table:no-data')}
				isColumnOrderingEnabled
				toolbar={{
					searchBar: true,
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
				exportFileName={({ all }) => (all ? 'monitorings-all' : 'monitorings-selection')}
				data={monitorings}
				isSelectable
			/>
		</Layer>
	);
};
export default InboxMonitoringTable;
