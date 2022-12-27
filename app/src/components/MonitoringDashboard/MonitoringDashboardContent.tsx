import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import MonitoringDashboardTableView from './MonitoringDashboardTableView';
import MonitoringDashboardTileView from './MonitoringDashboardTileView';

const MonitoringDashboardContent = () => {
	const { filters } = useStartedMonitorings();

	return filters.isTile !== false ? (
		<MonitoringDashboardTileView />
	) : (
		<MonitoringDashboardTableView />
	);
};
export default MonitoringDashboardContent;
