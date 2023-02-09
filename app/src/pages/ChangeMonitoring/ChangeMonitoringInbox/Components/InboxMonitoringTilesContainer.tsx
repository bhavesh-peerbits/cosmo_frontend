import { Column, Grid } from '@carbon/react';
import useInboxMonitorings from '@hooks/inbox-monitoring/useInboxMonitorings';
import MonitoringDashboardTile from './MonitoringDashboardTile';

const InboxMonitoringTilesContainer = () => {
	const { monitorings } = useInboxMonitorings();
	return (
		<Grid fullWidth narrow className='pl-5'>
			{monitorings.map(monitoring => (
				<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
					<MonitoringDashboardTile monitoring={monitoring} />
				</Column>
			))}
		</Grid>
	);
};
export default InboxMonitoringTilesContainer;
