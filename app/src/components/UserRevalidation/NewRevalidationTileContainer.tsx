import { Grid, Column } from '@carbon/react';
import useRevalidations from '@hooks/user-revalidation.ts/useRevalidations';
import NewRevalidationTile from './NewRevalidationTile';

const NewRevalidationTileContainer = () => {
	const { revalidations } = useRevalidations();
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth className='h-full'>
					{revalidations.map(revalidation => (
						<Column key={revalidation.id} sm={4} md={3} lg={8} xlg={5} max={4}>
							<NewRevalidationTile revalidation={revalidation} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default NewRevalidationTileContainer;
