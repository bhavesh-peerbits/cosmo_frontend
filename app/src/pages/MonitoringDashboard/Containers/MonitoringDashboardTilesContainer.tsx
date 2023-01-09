import useStartedMonitorings from '@hooks/monitoring-dashboard/useStartedMonitorings';
import { Column, Grid } from '@carbon/react';
import MonitoringDashboardTile from '../Components/MonitoringDashboardTile';

const MonitoringDashboardTilesContainer = () => {
	const { monitorings } = useStartedMonitorings();
	return (
		<Grid fullWidth narrow className='pl-5'>
			{monitorings.map(monitoring => (
				<>
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
					<Column key={monitoring.id} sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDashboardTile monitoring={monitoring} />
					</Column>{' '}
				</>
			))}
		</Grid>
	);
};
export default MonitoringDashboardTilesContainer;
