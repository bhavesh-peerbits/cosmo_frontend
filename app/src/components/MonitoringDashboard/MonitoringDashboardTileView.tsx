import { Grid, Column } from '@carbon/react';

type MonitoringDashboardTileViewProps = {
	view: 'all' | 'pending' | 'ongoing' | 'completed';
};
const MonitoringDashboardTileView = ({ view }: MonitoringDashboardTileViewProps) => {
	return (
		<Grid>
			<Column sm={4} md={2} lg={3}>
				filters
			</Column>
			<Column sm={4} md={6} lg={13}>
				{view}
			</Column>
		</Grid>
	);
};
export default MonitoringDashboardTileView;
