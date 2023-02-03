import { Column, Grid, Layer } from '@carbon/react';
import RevalidationsTable from './RevalidationsTable';

const RevalidationTabContent = () => {
	return (
		<Grid fullWidth className='h-full p-container-1'>
			<Column sm={4} md={8} lg={16}>
				<Layer>
					<RevalidationsTable />
				</Layer>
			</Column>
		</Grid>
	);
};

export default RevalidationTabContent;
