import { Column, Grid } from '@carbon/react';
import MonitoringDraftTile from '../Components/MonitoringDraftTile';

const MonitoringDraftTileContainer = () => {
	return (
		<Grid fullWidth narrow className='pl-5'>
			<Column sm={4} md={8} lg={16} xlg={16} max={16}>
				<Grid fullWidth narrow condensed>
					<Column sm={4} md={4} lg={8} xlg={4} max={4}>
						<MonitoringDraftTile />
					</Column>
				</Grid>
			</Column>
		</Grid>
	);
};
export default MonitoringDraftTileContainer;
