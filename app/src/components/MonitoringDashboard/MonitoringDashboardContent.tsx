import MonitoringDashboardTileView from './MonitoringDashboardTileView';

type MonitoringDashboardContentProps = {
	view: 'all' | 'pending' | 'ongoing' | 'completed';
};
const MonitoringDashboardContent = ({ view }: MonitoringDashboardContentProps) => {
	return <MonitoringDashboardTileView view={view} />;
};
export default MonitoringDashboardContent;
