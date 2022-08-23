import { Grid, Column } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import RevalidationReviewerTile from './RevalidationReviewerTile';

const RevalidationReviewerTileContainer = () => {
	// TODO Map all applications
	return (
		<Grid fullWidth narrow className='p-container-1'>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth className='h-full space-y-5'>
					<FullWidthColumn>
						<RevalidationReviewerTile />
					</FullWidthColumn>
				</Grid>
			</Column>
		</Grid>
	);
};
export default RevalidationReviewerTileContainer;
