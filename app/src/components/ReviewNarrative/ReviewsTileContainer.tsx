import { Grid, Column } from '@carbon/react';
import useReviewApps from '@hooks/review/useReviewApps';
import ReviewTile from './ReviewTile';

const ReviewsTileContainer = () => {
	const { apps } = useReviewApps();
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth>
					{apps.map(el => (
						<Column key={el.id} sm={4} md={3} lg={8} xlg={5} max={4}>
							<ReviewTile review={el} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default ReviewsTileContainer;
