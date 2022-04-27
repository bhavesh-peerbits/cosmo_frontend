import { Column, Grid } from '@carbon/react';
import useManagementApps from '@hooks/management/useManagementApps';
import ApplicationTile from './ApplicationTile';

const ApplicationsTileContainer = () => {
	const { apps } = useManagementApps();

	return (
		<Grid fullWidth narrow>
			<Column sm={{ span: 4 }} md={{ span: 6 }} lg={{ span: 16 }}>
				<Grid fullWidth narrow>
					{apps.map(el => (
						<Column key={el.name} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }}>
							<ApplicationTile application={el} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};

export default ApplicationsTileContainer;
