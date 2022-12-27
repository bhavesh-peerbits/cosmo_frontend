import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import { Column, Grid } from '@carbon/react';
import MonitoringDashboardTile from '../Components/MonitoringDashboardTile';

const MonitoringDashboardTilesContainer = () => {
	const { monitorings } = useStartedMonitorings();
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={16} max={16}>
				<Grid fullWidth narrow condensed>
					{monitorings.map(monitoring => (
						<Column key={monitoring.id} sm={4} md={3} lg={8} xlg={4} max={4}>
							<MonitoringDashboardTile monitoring={monitoring} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default MonitoringDashboardTilesContainer;
