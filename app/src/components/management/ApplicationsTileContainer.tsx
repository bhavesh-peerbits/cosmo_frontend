import { Column, Grid } from '@carbon/react';
import useManagementApps from '@hooks/management/useManagementApps';
import ApplicationTile from '@components/management/ApplicationTile';

const ApplicationsTileContainer = () => {
	const { apps } = useManagementApps();

	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={16} max={16}>
				<Grid fullWidth narrow condensed>
					{apps.map(el => (
						<Column key={el.id} sm={4} md={3} lg={8} xlg={4} max={4}>
							<ApplicationTile application={el} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};

export default ApplicationsTileContainer;
