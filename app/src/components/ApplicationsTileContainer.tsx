import { Column, Grid } from '@carbon/react';
import ApplicationTile from './ApplicationTile';

const ApplicationsTileContainer = () => {
	const applicationsList = [...Array(20).keys()];

	return (
		<Grid fullWidth narrow>
			<Column sm={{ span: 4 }} md={{ span: 6 }} lg={{ span: 16 }}>
				<Grid fullWidth narrow>
					{applicationsList.map(el => (
						<Column key={el} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }}>
							<ApplicationTile />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};

export default ApplicationsTileContainer;
