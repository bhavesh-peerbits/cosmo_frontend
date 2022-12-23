import { Grid, Column } from '@carbon/react';
import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import MonitoringDashboardFilters from './MonitoringDashboardFilters';

type MonitoringDashboardTileViewProps = {
	view: 'all' | 'pending' | 'ongoing' | 'completed';
};
const MonitoringDashboardTileView = ({ view }: MonitoringDashboardTileViewProps) => {
	const { monitorings } = useStartedMonitorings();
	return (
		<Grid>
			<Column sm={4} md={2} lg={3}>
				<MonitoringDashboardFilters />
			</Column>
			<Column sm={4} md={6} lg={13}>
				{monitorings.map(mon => mon.scheduling.frequency)}
				{view}
			</Column>
		</Grid>
	);
};
export default MonitoringDashboardTileView;
