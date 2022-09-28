import { Column, Grid } from '@carbon/react';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import EvidenceRequestTile from './EvidenceRequestTile';

type EvidenceRequestContainerProps = {
	requests: EvidenceRequestDraft[];
};

const EvidenceRequestTileContainer = ({ requests }: EvidenceRequestContainerProps) => {
	return (
		<Grid fullWidth narrow className='pl-5'>
			{requests.map(el => (
				<Column key={el.name} sm={4} md={4} lg={4} max={4}>
					<EvidenceRequestTile request={el} />
				</Column>
			))}
		</Grid>
	);
};

export default EvidenceRequestTileContainer;
