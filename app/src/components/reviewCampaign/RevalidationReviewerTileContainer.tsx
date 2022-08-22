import { Grid, Column } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import useRevalidations from '@hooks/user-revalidation/useRevalidations';
import RevalidationReviewerTile from './RevalidationReviewerTile';

const RevalidationReviewerTileContainer = () => {
	const { revalidations } = useRevalidations();
	return (
		<Grid fullWidth narrow className='p-container-1'>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth className='h-full space-y-5'>
					{revalidations.map(revalidation => (
						<FullWidthColumn>
							<RevalidationReviewerTile revalidation={revalidation} />
						</FullWidthColumn>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default RevalidationReviewerTileContainer;
