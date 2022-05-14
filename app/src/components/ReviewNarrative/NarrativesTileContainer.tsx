import { Grid, Column } from '@carbon/react';
import Narrative from '@model/Narrative';
import NarrativeTile from './NarrativeTile';

type NarrativeTileContainerProps = {
	narratives: Narrative[];
};
const NarrativeTileContainer = ({ narratives }: NarrativeTileContainerProps) => {
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth>
					{narratives.map(el => (
						<Column key={el.id} sm={4} md={3} lg={8} xlg={5} max={4}>
							<NarrativeTile narrative={el} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default NarrativeTileContainer;
