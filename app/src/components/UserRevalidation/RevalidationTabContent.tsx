import { Column, Grid } from '@carbon/react';
import RevalidationsOngoingFilters from './RevalidationsOngoingFilters';
import RevalidationsTable from './RevalidationsTable';

const RevalidationTabContent = () => {
	return (
		<Grid fullWidth className='h-full p-container-1'>
			<Column sm={4} md={2} lg={3}>
				<div className='md:ml-0'>
					<RevalidationsOngoingFilters />
				</div>
			</Column>
			<Column sm={4} md={6} lg={13}>
				<RevalidationsTable />
			</Column>
		</Grid>
	);
};

export default RevalidationTabContent;
