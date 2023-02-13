import { Grid, Column } from '@carbon/react';
import useAppsInReview from '@hooks/review/useAppsInReview';
import ReviewTile from '../Components/ReviewTile';

const ReviewsTileContainer = () => {
	const { apps } = useAppsInReview();
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={16} max={16}>
				<Grid fullWidth narrow condensed>
					{apps.map(el => (
						<Column key={el.id} sm={4} md={3} lg={8} xlg={4} max={4}>
							<ReviewTile application={el} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default ReviewsTileContainer;
