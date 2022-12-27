import { Grid, Column } from '@carbon/react';
import MonitoringSummaryDetails from '../Components/MonitoringSummaryDetails';

const MonitoringDetailsContent = () => {
	return (
		<Grid fullWidth className='p-container-1'>
			<Column sm={4} md={2} lg={3}>
				<MonitoringSummaryDetails />
			</Column>
			<Column sm={4} md={6} lg={13}>
				card list
			</Column>
		</Grid>
	);
};
export default MonitoringDetailsContent;
