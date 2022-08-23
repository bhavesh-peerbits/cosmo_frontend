import { Grid, Column } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import RevalidationsOngoingFilters from '@components/UserRevalidation/RevalidationsOngoingFilters';
import RevalidationsTable from '@components/UserRevalidation/RevalidationsTable';

const RevalidationsOngoing = () => {
	return (
		<PageHeader pageTitle='Revalidations Ongoing'>
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
		</PageHeader>
	);
};
export default RevalidationsOngoing;
