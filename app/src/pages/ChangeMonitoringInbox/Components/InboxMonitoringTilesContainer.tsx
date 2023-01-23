import { Column, Grid } from '@carbon/react';
import useInboxMonitorings from '@hooks/inbox-monitoring/useInboxMonitorings';
import MonitoringDashboardTile from '@components/ChangeMonitoring/MonitoringDashboardTile';

const InboxMonitoringTilesContainer = () => {
	const { monitorings } = useInboxMonitorings();
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
export default InboxMonitoringTilesContainer;
