import { Grid, Column } from '@carbon/react';
import ApplicationChangesTable from './ApplicationChangesTable';

const ApplicationChangesContainer = () => {
	return (
		<Grid fullWidth className='h-full'>
			<Column sm={4} md={8} lg={16}>
				<div>
					<ApplicationChangesTable />
				</div>
			</Column>
		</Grid>
	);
};
export default ApplicationChangesContainer;
