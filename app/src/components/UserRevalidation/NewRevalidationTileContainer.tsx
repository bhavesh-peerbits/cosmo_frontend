import { Grid, Column } from '@carbon/react';
import NewRevalidationTile from './NewRevalidationTile';

const NewRevalidationTileContainer = () => {
	const campaigns = [
		{
			id: 'id1',
			name: 'Very Very Very Very Very long Name',
			type: 'SUID',
			layer: 'OS'
		}
	];
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth>
					{campaigns.map(campaign => (
						<Column key={campaign.id} sm={4} md={3} lg={8} xlg={5} max={4}>
							<NewRevalidationTile campaign={campaign} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default NewRevalidationTileContainer;
