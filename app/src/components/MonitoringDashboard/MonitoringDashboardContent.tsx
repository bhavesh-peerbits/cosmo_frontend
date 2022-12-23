import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import MonitoringDashboardTableView from './MonitoringDashboardTableView';
import MonitoringDashboardTileView from './MonitoringDashboardTileView';

type MonitoringDashboardContentProps = {
	view: 'all' | 'pending' | 'ongoing' | 'completed';
};
const MonitoringDashboardContent = ({ view }: MonitoringDashboardContentProps) => {
	const { filters } = useStartedMonitorings();

	return filters.isTile ? (
		<MonitoringDashboardTileView view={view} />
	) : (
		<MonitoringDashboardTableView />
	);
};
export default MonitoringDashboardContent;
