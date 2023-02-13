import { Grid, Column } from '@carbon/react';
import Monitoring from '@model/ChangeMonitoring/Monitoring';
import MonitoringSummaryDetails from '../Components/MonitoringSummaryDetails';
import RunsTileContainer from './RunsTileContainer';

type MonitoringDetailsContentProps = {
	monitoring: Monitoring;
};

const MonitoringDetailsContent = ({ monitoring }: MonitoringDetailsContentProps) => {
	return (
		<Grid fullWidth className='p-container-1'>
			<Column sm={4} md={2} lg={3}>
				<MonitoringSummaryDetails monitoring={monitoring} />
			</Column>
			<Column sm={4} md={6} lg={13}>
				<RunsTileContainer monitoring={monitoring} />
			</Column>
		</Grid>
	);
};
export default MonitoringDetailsContent;
