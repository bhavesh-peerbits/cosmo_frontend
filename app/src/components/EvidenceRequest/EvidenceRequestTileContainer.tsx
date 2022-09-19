import { Column, Grid } from '@carbon/react';
import EvidenceRequest from '@model/EvidenceRequest';
import EvidenceRequestTile from './EvidenceRequestTile';

type EvidenceRequestContainerProps = {
	elements: EvidenceRequest[];
};

const EvidenceRequestTileContainer = ({ elements }: EvidenceRequestContainerProps) => {
	return (
		<Grid fullWidth narrow className='pl-5'>
			{elements.map(el => (
				<Column key={el.id} sm={4} md={4} lg={4} max={4}>
					<EvidenceRequestTile element={el} />
				</Column>
			))}
		</Grid>
	);
};

export default EvidenceRequestTileContainer;
