import useEvidenceRequestAction from '@hooks/evidence-request/useEvidenceRequestAction';
import { Grid, Column } from '@carbon/react';
import EvidenceRequestActionTile from './EvidenceRequestActionTile';

const EvidenceRequestActionTileContainer = () => {
	const { requests } = useEvidenceRequestAction();

	return (
		<Grid fullWidth narrow className='pl-5'>
			<Column sm={4} md={8} lg={16} xlg={16} max={16}>
				<Grid fullWidth narrow condensed>
					{requests.map(er => (
						<Column key={er.id} sm={4} md={4} lg={8} xlg={4} max={4}>
							<EvidenceRequestActionTile request={er} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};

export default EvidenceRequestActionTileContainer;
