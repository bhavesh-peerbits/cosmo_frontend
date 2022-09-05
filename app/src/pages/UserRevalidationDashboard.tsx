import { Column, Grid } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import RevalidationReviewerTileContainer from '@components/reviewCampaign/RevalidationReviewerTileContainer';
import RevalidationReviewerFilters from '@components/reviewCampaign/RevalidationReviewerFilters';
import Fade from '@components/Fade';

const UserRevalidationDashboard = () => {
	return (
		<PageHeader pageTitle='User Revalidation'>
			<Fade>
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
			</Fade>
		</PageHeader>
	);
};
export default UserRevalidationDashboard;
