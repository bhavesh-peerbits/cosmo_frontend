import { Column, Grid } from '@carbon/react';
import ApplicationTile from './ApplicationTile';

const ApplicationsTileContainer = () => {
	const applicationsList = [
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />,
		<ApplicationTile />
	];
	return (
		<Grid fullWidth narrow>
			<Column sm={{ span: 4 }} md={{ span: 6 }} lg={{ span: 16 }}>
				<Grid fullWidth narrow>
					{applicationsList.map(application => (
						<Column sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }}>
							{application}
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};

export default ApplicationsTileContainer;
