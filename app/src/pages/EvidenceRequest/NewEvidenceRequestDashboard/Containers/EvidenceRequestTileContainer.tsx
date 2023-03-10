import { Column, Grid } from '@carbon/react';
import EvidenceRequestDraft from '@model/EvidenceRequest/EvidenceRequestDraft';
import EvidenceRequestTile from '../Components/EvidenceRequestTile';

type EvidenceRequestContainerProps = {
	requests: EvidenceRequestDraft[];
};

const EvidenceRequestTileContainer = ({ requests }: EvidenceRequestContainerProps) => {
	return (
		<Grid fullWidth narrow className='pl-5'>
			{requests.map(request => (
				<Column key={request.name} sm={4} md={4} lg={4} max={4}>
					<EvidenceRequestTile request={request} />
				</Column>
			))}
		</Grid>
	);
};

export default EvidenceRequestTileContainer;
