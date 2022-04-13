import { Column, Grid } from '@carbon/react';
import ApplicationTile from './ApplicationTile';

const ApplicationsTileContainer = () => {
	return (
		<Grid fullWidth narrow>
			<Column sm={{ span: 4 }} md={{ span: 6 }} lg={{ span: 16 }}>
				<Grid fullWidth narrow>
					<Column sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }}>
						<ApplicationTile />
					</Column>
					<Column sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }}>
						<ApplicationTile />
					</Column>
					<Column sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }}>
						<ApplicationTile />
					</Column>
					<Column sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }}>
						<ApplicationTile />
					</Column>
				</Grid>
			</Column>
		</Grid>
	);
};

export default ApplicationsTileContainer;
