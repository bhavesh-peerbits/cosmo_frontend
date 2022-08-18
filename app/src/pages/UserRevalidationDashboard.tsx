import { Column, Grid } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import RevalidationReviewerTileContainer from '@components/UserRevalidation/RevalidationReviewerTileContainer';

const UserRevalidationDashboard = () => {
	return (
		<PageHeader pageTitle='User Revalidation'>
			<Grid fullWidth narrow className='h-full'>
				<Column sm={4} md={2} lg={3}>
					<div className='pl-5 md:ml-0'>Filters</div>
				</Column>
				<Column sm={4} md={6} lg={13}>
					<RevalidationReviewerTileContainer />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default UserRevalidationDashboard;
