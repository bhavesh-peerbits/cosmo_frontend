import { Grid, Column } from '@carbon/react';
import useAppsInReview from '@hooks/review/useAppsInReview';
import ReviewTile from './ReviewTile';

const ReviewsTileContainer = () => {
	const { apps: data } = useAppsInReview();
	const apps = data.filter(app => app.startNarrativeReview);
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth>
					{apps.map(el => (
						<Column key={el.id} sm={4} md={3} lg={8} xlg={5} max={4}>
							<ReviewTile application={el} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default ReviewsTileContainer;
