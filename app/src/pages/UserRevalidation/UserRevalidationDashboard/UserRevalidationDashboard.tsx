import { Column, Grid } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import RevalidationReviewerTileContainer from '@pages/UserRevalidation/UserRevalidationDashboard/Containers/RevalidationReviewerTileContainer';
import RevalidationReviewerFilters from '@pages/UserRevalidation/UserRevalidationDashboard/Components/RevalidationReviewerFilters';

const UserRevalidationDashboard = () => {
	return (
		<PageHeader pageTitle='User Revalidation'>
			<Grid fullWidth narrow className='h-full p-container-1'>
				<Column sm={4} md={2} lg={3}>
					<div className='pl-5 md:ml-0'>
						<RevalidationReviewerFilters />
					</div>
				</Column>
				<Column sm={4} md={6} lg={13}>
					<RevalidationReviewerTileContainer />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default UserRevalidationDashboard;
